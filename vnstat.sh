#!/usr/bin/env bash

# file path
filePath="public/chartjs/"
interface="ens4"
fileName="vnstat.json"

VNSTAT="vnstat"

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd $script_dir

# Check if user is root
[ $(id -u) != "0" ] && {
    echo "${CFAILURE}Error: You must be root to run this script${CEND}"
    exit 1
}

declare release="ubuntu"
# Check release
if [ -f /etc/redhat-release ]; then
    release="centos"
elif cat /etc/issue | grep -Eqi "debian"; then
    release="debian"
elif cat /etc/issue | grep -Eqi "ubuntu"; then
    release="ubuntu"
elif cat /etc/issue | grep -Eqi "centos|red hat|redhat"; then
    release="centos"
elif cat /proc/version | grep -Eqi "debian"; then
    release="debian"
elif cat /proc/version | grep -Eqi "ubuntu"; then
    release="ubuntu"
elif cat /proc/version | grep -Eqi "centos|red hat|redhat"; then
    release="centos"
fi

# check vnstat command
# If don't have it, print some infomation & auto install it from release repo
# else do nothing
if ! command -v $VNSTAT >/dev/null 2>&1; then
    echo "Installing $VNSTAT from $release repo"
    if [ "${release}" == "centos" ]; then
        sudo yum update
        sudo yum -y install $VNSTAT >/dev/null 2>&1
    else
        sudo apt-get update >/dev/null 2>&1
        sudo apt-get install $VNSTAT -y >/dev/null 2>&1
    fi
fi

if ! [ -d $filePath ]; then
    mkdir -p $filePath
fi

vnstat -i $interface --json > $filePath$fileName