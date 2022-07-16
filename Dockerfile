FROM node:erbium

# Copy files from client and server
COPY /client /client
COPY /server /server

# Navigate to client to run build
WORKDIR /client 
RUN npm run build

# Navigate to server to run dependencies
WORKDIR /server 
RUN npm install

# Expose port to outside
EXPOSE 3000

CMD ["npm", "start"]
