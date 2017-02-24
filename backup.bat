ECHO Wait 5 seconds for MongoDB to start
TIMEOUT /T 5
ECHO Create MongoDB backup
mongodump --out .\mongodb\dump
ECHO Move backup to archive folder
mkdir mongodb\archive\temp
move mongodb\dump mongodb\archive\temp
cd mongodb\archive
ren temp %date:~10,4%%date:~7,2%%date:~4,2%%time:~0,2%%time:~3,2%
ECHO backup finished