import axios from 'axios';

export async function handler(event: AWSLambda.SQSEvent) {
  console.log(JSON.stringify(event));

  const response = await axios.get(process.env.HTTP_TARGET!);
  console.log(response.data);
}