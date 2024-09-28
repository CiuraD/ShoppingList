package shop_api.services;

import java.io.IOException;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.model.GridFSUploadOptions;

@Service
public class ImageService {

    @Autowired
    private GridFsTemplate gridFsTemplate;

    @Autowired
    private GridFSBucket gridFSBucket;

    public String storeImage(MultipartFile file) throws IOException {
        GridFSUploadOptions options = new GridFSUploadOptions()
                .metadata(new org.bson.Document("type", file.getContentType()));

        ObjectId id = gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(), options);
        return id.toString();
    }

    public byte[] getImage(String id) throws IOException {
        return gridFSBucket.openDownloadStream(new ObjectId(id)).readAllBytes();
    }
}