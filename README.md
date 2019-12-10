# Sample Multi-language Node.js website with Prismic CMS
 
This is an example multi-language project with node.js and express.js with content managed in Prismic (an API-based CMS).
 
## Check out our article for a step-by-step guide to getting this project up and running
 
[Prismic Example project guide](https://app.intercom.com/a/apps/bnnh3u9v/articles/articles/3369091/show) contains the instructions to create your Prismic repository and run this project.
 
## Deploy your Node.js Multi-language project
 
An easy way to deploy your Node.js website is to use [Heroku](http://www.heroku.com). Just follow these few simple steps once you have successfully [signed up](https://id.heroku.com/signup/www-header) and [installed the Heroku toolbelt](https://toolbelt.heroku.com/):
 
Create a new Heroku application
 
```
heroku create
```
 
Initialize a new Git repository:
 
```
git init
heroku git:remote -a your-heroku-app-name
```
 
Commit your code to the Git repository and deploy it to Heroku:
 
```
git add .
git commit -am "make it better"
git push heroku master
```
Ensure you have at least one node running:
 
```
heroku ps:scale web=1
```
 
You can now browse your application online:
 
```
heroku open
```
 
## License
 
This software is licensed under the Apache 2 license, quoted below.
 
Copyright 2013-2019 Prismic (http://prismic.io).
 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
