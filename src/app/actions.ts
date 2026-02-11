'use server'

import { revalidatePath } from 'next/cache';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);


export async function updateProfile(formData: FormData) {
    const username = formData.get('username');
    const bio = formData.get('bio');
    const configRaw = formData.get('config');

    console.log(`Updating profile for ${username}...`);

    // VULNERABILITY: Insecure Deserialization / Injection
    // The application trusts the 'config' field to contain valid JSON configuration.
    // Ideally, one would use JSON.parse(configRaw), but here we simulate a developer
    // using eval() or similar dynamic execution for "flexibility" or to handle
    // a complex non-standard format, or unwittingly passing it to a sink.

    // In this specific PoC, we will demonstrate RCE by passing the input to a function
    // that executes it. To make it more "realistic" as a subtle bug, let's imagine
    // the developer tries to parse a custom config format using eval, or passes
    // part of the config to a system command (e.g., to generate a theme file).

    // Scenario: The app tries to generate a config file using a shell command, 
    // but fails to sanitize the input.

    if (configRaw && typeof configRaw === 'string') {
        try {
            // DANGEROUS: SINK
            // If configRaw contains shell metacharacters (e.g. `$(whoami)` or `; rm -rf /`),
            // they will be executed.
            // Or if we used eval(`const config = ${configRaw}`), malicious JS could run.

            // Let's go with the shell command injection for this PoC as it's very visual (RCE).
            // e.g. "echo 'User Config: " + configRaw + "' > /tmp/config"

            const command = `echo '{"username": "${username}", "config": ${configRaw}}' > /tmp/last_profile_update.json`;
            console.log(`Executing: ${command}`);

            await execPromise(command);

        } catch (error) {
            console.error("Failed to process config:", error);
        }
    }

    // Example of the FIX:
    // 1. NEVER use eval() or execute shell commands with user input.
    // 2. Validate input rigorously (e.g. using Zod).
    // 3. Use safe APIs (e.g. fs.writeFile instead of echo > file).
    /* :FIX:
    if (configRaw && typeof configRaw === 'string') {
        try {
            const config = JSON.parse(configRaw); // Safe parsing
            // validates schema...
            await fs.promises.writeFile('/tmp/last_profile_update.json', JSON.stringify({ username, config }));
        } catch (e) { ... }
    }
    */

    revalidatePath('/');
    return { message: 'Profile updated' };
}
