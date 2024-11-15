# PolaFit Cloud Computing

<img src="https://github.com/Mubazir-Bangkit-2023/mubazir-cloud-computing/assets/96626242/ed84e5bf-4c56-45cc-ba91-e99c6d8e4aab" width="100%" height="50%">

## Technology Used

#### Cloud SQL
<img src="https://github.com/Mubazir-Bangkit-2023/mubazir-cloud-computing/assets/96626242/d4e252f2-151e-4973-b9b1-8d7b164dce33" width="65px" height="80px">
<br><pre>
   <span style="font-size: 18px; color: #3366cc;">Database type: mysql</span>
   <span style="font-size: 18px; color: #3366cc;">Version : 8.0 </span>
   <span style="font-size: 18px; color: #3366cc;">Memory : 614.4 MB </span>
   <span style="font-size: 18px; color: #3366cc;">Storage : 10 GB </span>
   <span style="font-size: 18px; color: #3366cc;">vCPUs : 1 </span>
</pre>

#### Cloud Storage
<img src="https://github.com/Mubazir-Bangkit-2023/mubazir-cloud-computing/assets/96626242/ac9ff32e-dd59-4368-a02b-d239df606ddc" width="65px" height="75px">
<br>
<pre>
   <span style="font-size: 18px; color: #3366cc;">Location Type : Region </span>
   <span style="font-size: 18px; color: #3366cc;">Location : asia-southeast2 (Jakarta)</span>
   <span style="font-size: 18px; color: #3366cc;">Storage Class : Standard</span>
</pre>

#### Cloud Run
<img src="https://github.com/Mubazir-Bangkit-2023/mubazir-cloud-computing/assets/96626242/fda0b2ea-8b04-4bf2-b6c0-3906b7cb6c43" width="70px" height="75px">
<br>
<pre>
   <span style="font-size: 18px; color: #3366cc;">Location : asia-southeast2 (Jakarta) </span>
   <span style="font-size: 18px; color: #3366cc;">Memory : 1 GB </span>
   <span style="font-size: 18px; color: #3366cc;">vCPUs : 1 </span>
</pre>

#### Installation

1. Clone the repository:

   ```bash
   git https://github.com/PolaFit/polafit-cloud-computing.git

2. Install :

   ```bash
   npm install

3. create .env file

   ```bash
    PORT=3000
    NODE_ENV=development 
    
    DB_HOST=your_db_host
    DB_PORT=your_db_port         
    DB_USER=your_db_user     
    DB_PASSWORD=your_db_password 
    DB_NAME=your_db_name
    
    INSTANCE_CONNECTION_NAME=your-project-id:your-region:your-instance-id
    USE_CLOUD_SQL_CONNECTOR=true
    IP_TYPE=PRIVATE
    
    JWT_SECRET=your_jwt_secret
    REFRESH_SECRET=your_refresh_secret

5. Start :
   ```bash
   npm run start
