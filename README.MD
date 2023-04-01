### Docker run configuration:
- node:
	docker run -d -p 8000:8888 --network app -v /home/userName/Proj/myapp:/home/ubuntu/myapp --name node-lab {ContainerName:node.0.1}