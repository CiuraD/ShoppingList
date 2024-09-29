package shop_api.customConfigs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(MongoConfig.class);

    @Bean
    public MongoClient mongoClient() {
        logger.info("Creating MongoClient with URI: mongodb://localhost:27017/shop_db");
        return MongoClients.create("mongodb://localhost:27017/shop_db");
    }

    @Bean
    public MongoTemplate mongoTemplate() {
        logger.info("Creating MongoTemplate with database name: shop_db");
        return new MongoTemplate(mongoClient(), "shop_db");
    }

    @Bean
    public GridFSBucket gridFSBucket(MongoDatabaseFactory mongoDatabaseFactory) {
        logger.info("Creating GridFSBucket with database name: shop_db");
        return GridFSBuckets.create(mongoDatabaseFactory.getMongoDatabase());
    }
}