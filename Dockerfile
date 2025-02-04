# Use an official Debian-based image
FROM ubuntu:latest

# Update and install Apache2 and npm
RUN apt-get update && \
    apt-get install -y apache2 npm && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN a2enmod rewrite
# Copy customized HTML files to the default Apache HTML directory
COPY pyiota-gui_build/ /var/www/html/
COPY .htaccess /var/www/html/
COPY config.json /var/www/html/
COPY casso.conf /etc/apache2/sites-available/000-default.conf
# Expose port 80
EXPOSE 80

# Start Apache server in the foreground
CMD ["apachectl", "-D", "FOREGROUND"]

