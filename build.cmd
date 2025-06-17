set IMAGE_NAME=image_rdm_reporter_front

docker pull debian:12-slim
@REM docker build --no-cache -t %IMAGE_NAME% .
docker build -t %IMAGE_NAME% .

pause