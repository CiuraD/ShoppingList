package shop_api.customConfigs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${spring.data.mongodb.uri}")
    private String mongoUrl;

    @Value("${spring.data.mongodb.database}")
    private String databaseName;

    private static final Logger logger = LoggerFactory.getLogger(MongoConfig.class);

    @Bean
    public MongoClient mongoClient() {
        logger.info("Creating MongoClient with URI: {}", mongoUrl);
        return MongoClients.create(mongoUrl);
    }

    @Bean
    public MongoTemplate mongoTemplate() {
        logger.info("Creating MongoTemplate with database name: {}", databaseName);
        return new MongoTemplate(mongoClient(), databaseName);
    }

    @Bean
    public GridFSBucket gridFSBucket(MongoDatabaseFactory mongoDatabaseFactory) {
        logger.info("Creating GridFSBucket with database name: {}", databaseName);
        return GridFSBuckets.create(mongoDatabaseFactory.getMongoDatabase());
    }
}