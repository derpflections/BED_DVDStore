1) Press the Windows key, and type in cmd. 
2) Open command prompt, and use the cd command to navigate into the root folder, which should contain this README file, as well as a "backend" and "frontend" folder.
3) Open one more instance of command prompt.
4) Navigate into the frontend folder with one instance, and the backend folder with the other.
5) Run the command 'npm init' in the backend instance, and press enter until done.
6) Press the Windows key again, and type in 'MySQL Workbench 8.0 CE'
7) Open your SQL workbench, and open a connection. 
8) Log into the SQL connection with the credentials you setup your SQL Workbench with.
9) Once connected, you will be greeted with the Workspace screen.
10) Press 'Control', 'Shift' and 'O' at the same time, and navigate into the folder containing 'databaseCreation.sql'
11) Alternatively, you can also mouse over to the top left of the screen, where there will be two icons (a sheet of paper, with 'SQL' written on it.) Click on the icon with the open folder on it.
12) Once File Explorer is open, navigate into the root folder containing 'databaseCreation.sql'
13) Double click on 'databaseCreation.sql', after which it will open in your workspace.
14) Mouse over the 7th icon from the left at the top of the window where script has opened. 
15) Check if the tooltip which appears says "Toggle whether execution of SQL script should continue after failed statements'
16) If step 9 is true, click on it, and it will now be indented inwards.
17) Press 'Control', 'Shift', and 'Enter' at the same time to run the script.
18) Repeat step 15, and click on the arrow next to the 'bed_dvd_db' schema label.
19) If there are arrows next to 'Tables' and 'Views', you have successfully completed the setup of the project's database!

20) To start the servers, go back to the command prompt instances that you started earlier, and key in the command "nodemon server.js" into both prompts.
21) If you get the messages "Server hosted at http://localhost:3001" and "Store database hosted at http://localhost:3000", you have successfully started both servers!
22) You can now go to "localhost:3001" to access the webpage!


