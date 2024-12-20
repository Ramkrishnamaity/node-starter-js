import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
    }
});

async function pushOnBucket(file, directory) {
    try {

        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: directory,
            Body: file.buffer,
            ACL: "public-read",
        });

        await s3Client.send(command);

    } catch (error) {
        console.error("Error On upload object:", error);
        throw error;
    }
}

async function pullFromBucket(directory) {
    try {

        const command = new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: directory
        });

        await s3Client.send(command);

    } catch (error) {
        console.error("Error On remove object:", error);
        throw error;
    }
}

export { pushOnBucket, pullFromBucket };