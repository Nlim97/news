#News API
The backend API project I've developed serves as the foundation for a dynamic blog/news platform, empowering authors to publish articles and fostering user engagement through voting and commenting functionalities. Leveraging Node.js, PostgreSQL, and tools like Jest and Supertest, the project offers a robust and scalable solution for managing content and interactions within the platform.

At the core of the API lies a comprehensive set of endpoints designed to facilitate seamless CRUD operations on articles. Authors can effortlessly create, read, update, and delete articles, ensuring a smooth editorial workflow. Additionally, users can access articles by their unique IDs, providing easy navigation and retrieval of specific content pieces.

User engagement is further enhanced through the implementation of a sophisticated voting system. Users can express their opinions and preferences by voting on articles, thereby contributing to the platform's content curation and community-driven nature. This feature not only empowers users but also helps surface high-quality content based on popular demand.

Furthermore, the project incorporates a robust commenting system that encourages interaction and discussion among users. By allowing users to leave comments on articles, the platform fosters a sense of community and facilitates meaningful exchanges of ideas and perspectives. This functionality enriches the overall user experience and promotes engagement and collaboration within the platform.

Underpinning the entire system is the seamless integration with PostgreSQL, a powerful relational database management system. Leveraging psql for database interaction, the project ensures efficient storage and retrieval of articles, votes, and comments, while maintaining data integrity and reliability.

Finally, the project prioritizes quality assurance through rigorous testing using Jest and Supertest. Automated tests are conducted to validate the functionality and reliability of API endpoints, ensuring that the platform operates smoothly and consistently across various scenarios. This commitment to testing underscores the project's dedication to delivering a robust and dependable backend solution for the blog/news platform.

The app is currently being hosted on render and that database is hosted using elephant sql as my sql server.

here's the link and all its endpoints:
https://news-knrm.onrender.com
https://news-knrm.onrender.com/api
https://news-knrm.onrender.com/api/topics
https://news-knrm.onrender.com/api/articles
https://news-knrm.onrender.com/api/articles/:article_id
https://news-knrm.onrender.com/api/articles/:article_id/comments
https://news-knrm.onrender.com/api

*There is an endpoints.json in the root of the repo which has small descriptions on these endpoints and more on POST PATCH DELETE endpoints.




1. clone the project and make sure to remove me as the origin and add your repo as the origin 
2. create 3 .env files 1 for your tests and another for your your development data (you will later need to create another env file for render and elephant sql).
3. Then you will want to add your databases to these files i.e. PGDATABASE=database_name_here. This will ensure your database names are secure
4. You can then add scripts for the relevant setup database and seed commands.
5. finally you should add .env* to you .gitignore file so they will be ignored when committing and pushing to your github.

For instructions, please head over to [L2C NC News](https://l2c.northcoders.com/courses/be/nc-news).
