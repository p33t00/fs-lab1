### Docker run configuration:
- node:
	docker run -d -p 3000:3000 --network app -v /home/userName/Proj/myapp:/home/ubuntu/myapp --name node-lab {ContainerName:node.0.1}