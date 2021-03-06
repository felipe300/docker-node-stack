FROM node:17.4
    
WORKDIR /usr/src/app
    
COPY package.json ./
RUN npm install

COPY prisma/schema.prisma ./prisma/
RUN npx prisma generate

COPY . .
RUN npm run build

EXPOSE 5000

CMD [ "node", "index.js" ]