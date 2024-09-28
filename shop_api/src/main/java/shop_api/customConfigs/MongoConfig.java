package shop_api.customConfigs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;

@Configuration
public class MongoConfig {

    @Bean
    public MongoClient mongoClient() {
        return MongoClients.create("mongodb://localhost:27017"); // Update with your MongoDB connection string
    }

    @Bean
    public MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoClient(), "your_database_name"); // Update with your database name
    }

    @Bean
    public GridFSBucket gridFSBucket(MongoDatabaseFactory mongoDatabaseFactory) {
        return GridFSBuckets.create(mongoDatabaseFactory.getMongoDatabase());
    }
}