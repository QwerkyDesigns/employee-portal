FROM node:alpine

RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN rm -rf node_modules
RUN npm install
RUN npm install -g prisma --unsafe-perm
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "dev"]