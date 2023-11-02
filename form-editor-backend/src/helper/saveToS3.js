import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';

const bucket = process.env.AWS_S3_BUCKET

const s3 = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env["AWS_ACCESS_KEY_ID"],
        secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"]
    }
})

export async function saveBase64ImageToS3(base64Data, objectKey) {
    const base64Buffer = Buffer.from(base64Data.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: "formeditor/"+objectKey, // The key (name) of the object in your S3 bucket
        Body: base64Buffer,
        ContentEncoding: 'base64',// Adjust the content type as needed
        ContentType: 'image/jpeg'
    })
    try{
        const resp = await s3.send(command)
        return resp.$metadata.httpStatusCode === 200
    }catch(err){
        console.error("errror",err)
    }
    
  }