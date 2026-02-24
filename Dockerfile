FROM ubuntu
RUN apt update && apt install apache2 -y
COPY . /var/www/html/
ENTRYPOINT ["apachectl","-D","FOREGROUND"]
