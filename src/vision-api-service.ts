import vision from "@google-cloud/vision";
import { promises as fs } from 'fs';

const credentials = {
    "type": "service_account",
    "project_id": "eatit-331711",
    "private_key_id": "f3fecf9e9035975c89c27791ab0d75b27d52d15f",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDbri73KStZyoNJ\nNzAZf42fY122TCOHebM1VLTnK9/opDnXCE79RlrN7yp9qRnTzVpw+rPrfoVVaIOS\n9TdG7bCndRvghxrxKPuPwkFmtlNERjfAgS6xkLy308GH1yo1UEq2kYMjqurbCemv\nF0dXSiXi87J5IQoUn7ZbXbxsN2ijjTNn6zRasojUCSQj6Vx1kMB7rCq0G2Dv3xsI\nbyR0aGMrLrMclkgKjwUITLdiTDrT/vTmAq3RwGoZEn676TNSzrCiQ1U+klZYPzAb\nparAgHXXwNu599AxHlYQncsHM+wzRKV5DK0sozofz7jq1NaHBLroeGoiQ0SYyj4v\n0einABTzAgMBAAECggEAB0AZdrjaIG2Jpbn3kW/fSbpq1mBu78K5gnIYQmT1T+VT\nr2Ar0zomNxPEsD8Lhi0J5h6wH36egfIgHZKQT3v6z5wS3nc3EWyL2PPNWsl7uA4l\nOupIkz22rM6FXalhUD8lKB9nV58Ff1M1bjzzctMUqwfmBQ9tGL8osp1GYb/2aSdp\nNi5VdctD9/8O6tBiUSl89YMl9S1SELNeE8UicFEPpII3MBR+xYMNknLGyXAeylXg\nVtTYc1Zn/1jaW/IwQIuF7CDRI4NwiOc8ckEhRJrR67TMBtomf+5hzeJ0i6QOOU/n\nGThgPFgdDgSPIKBGORj1MEqaqn03nRcNDdySyMrr2QKBgQD4dZjrIzjZEDx0tqDC\ni/O0qmjWr8Yt+i995bIA8V0VWrYSJ+iEIOHYQsPZcR7Yoa1MO/UDlpeG434Wl6Pq\nkOnvA02drtbScbmP2fnhPBdx4QyfV/V6NwDTpOH2hzMUXoRtQXPY36sgHSpm9X9e\n/bc6wF2auSUa9NZ5xEr85+JgbwKBgQDiWPz+wb7VXtccU+uPMjAHFU3OW0pIJIDF\nmLZ8dfdOk0yEwKP1nuW8/GjiLW428YAXmMB29ktoRL8q26ec8FCj1kMWzCSbpioY\nzSRyUlYEQafXHPzZk8DASdqNHwAH1t3CcLS0+E36v9JHDD879c/knB3GKv7nrknp\neae/M7rNvQKBgD0rfq2Na2aNh8TYXbXoDOUS+2K3vdv994lQbsWqptcmESNhLe6x\nxcifj2ZOYmDFVUwqisUKY13zTkyzosiSSvXsY0SKEhuXoi7XZJzeVYtU8+2bEzW2\nqv5wXq16VcoTBxl6/tGLJ69tXs4gbO5vGphdWe5I3OjJFLC/8hJX6LUDAoGAMUuS\nJeWKKywRizDXr4MNpK1GGbgWEGoqxV4B+E80wh8gXhUaYEbv393U9dVRGJQ2Am2Z\nFQ+E0ruOKsZV1b8cwOHMEK37Fw70QhyDYIaAB0NJS3cbtkMQipBLEcr7lbl86Hjl\nUjh1uzOFl0Wai/N4CGDbtynsBAcYP8nn96NLfr0CgYEAvEaJcrLfqxkSEvrptHgS\nyzE+jMTVUiEqHH6AbTWBylIY8Py0DsqGPHwCQHkHuFeG3qEOCFr+KolDFZ/O32Yf\n79dl80rXwMZDbFFGVUHIWF14JE8fiXCxqCGUQnj8CicG49fj3LaKHm8axzIGIp8K\n+qIvd8eeMDJ3DSjBj4tC38Q=\n-----END PRIVATE KEY-----\n",
    "client_email": "vision-api-account@eatit-331711.iam.gserviceaccount.com",
    "client_id": "107784034224195164651",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/vision-api-account%40eatit-331711.iam.gserviceaccount.com"
  };
  

export const getIngredientsFromImage = (async (imagePath: string) => {
    const client = new vision.ImageAnnotatorClient({credentials});
    const [result] = await client.objectLocalization(imagePath);
    const objects = result.localizedObjectAnnotations;
    const ingredients = objects?.map(object => object.name);

    fs.unlink(imagePath);

    return ingredients;
})