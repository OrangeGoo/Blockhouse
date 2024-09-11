# Instructions on how to set up and run the application.

* Make sure you have Docker installed.
* cd blockhouse
* run cmd `docker-compose up --build`

# Any libraries or tools used.

* Next.js
* TailwindCss
* shadcn/ui
* Recharts
* Django
* Django restframwork

# Brief explanation of the approach and thought process.

* Building user-friendly pages with Next.js and shacn/ui.
* Create interfaces using Django views to return data to the front end.
* The frontend receives data and renders it using the Recharts component.
* Write Dockerfiles for both the front-end and back-end, then create a docker-compose file to facilitate user operation.