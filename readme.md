# Description
Student CRUD using REST API applications with NodeJS.

# Author
Rakka Alhazimi, October 2022

# Requirements
- node.js v14.0+

# Installation
1. Clone this repository
    ```
    git clone https://github.com/rakkaalhazimi/Student-CRUD-NodeJS
    ```
2. Move to cloned directory
    ```
    cd Student-CRUD-NodeJS
    ```

3. Install all required library
   ```
   npm install
   ```

4. Specify your mongo db username and password in `.env`
   ```
    MONGO_USERNAME = "xxx"
    MONGO_PASSWORD = "xxx"
   ```

5. If you run mongo db on local or different server than atlas, please edit the URI in `db.js`.

6. Run nodejs server
   ```
   npm run dev
   ```

# Examples
Examples can be seen in `app.http` file. It consist of show, create, update and delete.

# Documentation
## ```\```
## ```\show```
- GET Request - show all student.

<br>

## ```\create```
- POST Request - add student into database.  
    **json params:**
    - name: str
    - class_name: str
    - major: str

<br>

## ```\update```
- POST Request - update student in database.  
    **json params:**
    - filter (any one):
      - name: str
      - class_name: str
      - major: str

    - change (any one):
      - name: str
      - class_name: str
      - major: str
  
<br>

## ```\delete```
- POST Request - delete student in database.  
    **json params (any one):**
    - name: str
    - class_name: str
    - major: str