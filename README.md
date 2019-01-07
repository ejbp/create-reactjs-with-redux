# create-reactjs-with-redux
Create a brand new reactjs with redux template project 

## motivation
I was tired of building a structure of a project from scratch, so I've built this script to produce a base structure of a reactjs project with redux

## setup

```shell
chmod 755 ./create-reactjs-webpack-project.sh 
```

## create a Project

```shell
./create-reactjs-webpack-project.sh [YOUR-PROJECT-DIR]
```

## run 
at project directory, run:
```shell
yarn start
#open your browser at http://localhost:8080/
```

## build

```shell
yarn build-prod #prod
yarn build-dev #dev
```

## check or customize project structure at 
```./_root``` #before run script

## check or customize initial modules install at 
```./create-reactjs-webpack-project.sh``` #before run script

## notes
optimized for macosx. 

If you want to run on other platforms you may give a try but it's not tested! The script may need slightly changes on seed commands and eventually at print functions.


