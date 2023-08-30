export default async function apiRequest(action: String, options: any){
    const result = await fetch(`https://ap-southeast-1.aws.data.mongodb-api.com/app/data-ugnuv/endpoint/data/v1/action/${action}`,{

        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'api-key': 'TcIC5Q4Y76d214VWpWBBTm7aeFkxgctwyOrchIMgd11lPNMT4zhmu6OWKYucWwev',
        },
        body: JSON.stringify({
            dataSource: 'Cluster0',
            database: 'posts-app',
            collection: 'posts',
            ...options
        }),
    }) .then((res) => res.json())
    return result
}   