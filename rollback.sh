#!/bin/bash

# React2Shell / Wiz-Demo-Defend Rollback Script
# Resets the environment for a fresh demo run.

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}[*] Rolling back changes...${NC}"

# Revert page.tsx
if [ -f src/app/page.tsx ]; then
    echo -e "  [+] Reverting src/app/page.tsx..."
    # Revert title
    perl -pi -e 's/HACKED-BY-REDTEAM/WIZ-DEMO-DEFEND/g' src/app/page.tsx
    # Revert status
    perl -pi -e 's/COMPROMISED/ONLINE/g' src/app/page.tsx
fi

# Remove created files
echo -e "  [+] Removing created artifacts..."
rm -vf public/hacked.html
rm -vf /tmp/pwned_*
rm -vf /tmp/backdoor.sh
rm -vf /tmp/last_profile_update.json
rm -vf server_debug.log

echo -e "${GREEN}[+] Rollback complete. Environment reset.${NC}"
