docker rm -f mysql
docker run -d --name=mysql --env="MYSQL_ROOT_PASSWORD=password" -p 4406:3306 -p 44060:33060 mysql:5.7
docker inspect mysql | jq '.[0].NetworkSettings.Networks.bridge.IPAddress'

