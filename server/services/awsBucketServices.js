const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const config = require("config");

const { protocol, host, port, region, accessKeyId, secretAccessKey, bucket } =
  config.get("S3Bucket");
const S3URL = `${protocol}://${host}${port ? `:${port}` : ""}`;
const S3 = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
  endpoint: S3URL,
  forcePathStyle: true,
});

//uploadVideoToBucket
const uploadObjectToBucket = async (key, fileStream, mimetype) => {
  const params = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: fileStream,
    ContentType: mimetype,
  });

  try {
    const res = await S3.send(params);
    return res;
  } catch (err) {
    throw new Error("Video file upload failed!");
  }
};

//getPresignedURL's
const generatePresignedUrl = async (arr) => {
  try {
    const presignedUrls = [];
    for (let i = 0; i < arr.length; i++) {
      const params = {
        Bucket: bucket,
        Key: arr[i].key,
        Expires: 60 * 60 * 24, //24 hours
      };

      const command = new GetObjectCommand(params);
      const url = await getSignedUrl(S3, command);
      presignedUrls.push({ ...arr[i]._doc, key: url });
    }

    return presignedUrls;
  } catch (error) {
    console.error("Error:", error);
  }
};

//DeleteObject
const deleteObject = async (key) => {
  console.log(key);
  const command = new DeleteObjectsCommand({
    Bucket: bucket,
    Delete: {
      Objects: [{ Key: key }],
      Quiet: false,
    },
  });

  try {
    const response = await S3.send(command);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  uploadObjectToBucket,
  generatePresignedUrl,
  deleteObject,
};
