const PaytmChecksum = require('paytmchecksum');
const https = require('https');
export default async function handler(req, res) {
    if (req.method == 'POST') {

        var paytmParams = {};

        paytmParams.body = {
            "requestType": "Payment",
            "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
            "websiteName": "YOUR_WEBSITE_NAME",
            "orderId": req.body.Oid,
            "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
            "txnAmount": {
                "value": req.body.subtotal,
                "currency": "INR",
            },
            "userInfo": {
                "custId": req.body.email,
            },
        };

        const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_KEY)

        paytmParams.head = {
            "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);



        const requestAsync = async () => {
            return new Promise((resolve, reject) => {
                var options = {

                    /* for Staging */
                    // hostname: 'securegw-stage.paytm.in',

                    /* for Production */
                    hostname: 'securegw.paytm.in',

                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.Oid}}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };
                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end', function () {
                        console.log('Response: ', response);
                        resolve(response)
                    });
                });

                post_req.write(post_data);
                post_req.end();
            })
        }
        let myrequest = await requestAsync()
        res.statue(200).json(myrequest)

    };
}
