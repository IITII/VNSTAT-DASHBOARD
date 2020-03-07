### VNSTAT-DASHBOARD
> A simple H5 DashBoard for vnstat which using `chart.js`  
> [简体中文](https://iitii.github.io/2019/10/11/1/)  
#### Notice
* It will auto-load `vnstat.json` and generate chart if you put a valid `vnstat.json` at the sibling directory 
* You can do like this if you want to build a traffic monitor site for you server 

```bash
sudo apt insall nginx vnstat -y
git clone https://github.com/IITII/VNSTAT-DASHBOARD /var/www/vnstat
cd /var/www/vnstat && git checkout ALLINONE
sed -i "s/root \S\+/root \/var\/www\/vnstat;/g" /etc/nginx/sites-available/default \
&& nginx -t && nginx -s reload \
echo "59 * * * * /usr/bin/vnstat --json > /var/www/vnstat/vnstat.json" \
>> /var/spool/cron/crontabs/`whoami`
crontab -l
# Now open your browser, type server ip and see the DashBoard
```
#### ScreenShot

![alt](docs/demo.png)

#### How to Use ?
> For normal use, you must make sure that vnstat had collected enough data.  

* Paste & Click Button.

> Fixed! -> ~~For some reason, the interface id which you want to see must be "ens4"!!!~~  
> See [demo data](docs/demo.json)  

#### Know issues

* Date maybe not correct in Hour Chart, especially in February & March. 