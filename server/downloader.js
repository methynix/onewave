const fs = require('fs');
const path = require('path');
const axios = require('axios');

const thermalPrinter = [
   'https://lh3.googleusercontent.com/sitesv/APaQ0SR13xHEMxRuqWieaO-1CmCnK2CNposai8ZfuJLdZYlKOl-iFVG_xRZGw108hICQJZRJw347aoDEyIavuKL1R8L8aiVawC-k-zh0Cjkp7viplVK-Xn3Ey0O1wXEe3vYE8mq9ikJ37hyLoRBRONz3sbFVhnr-LBvPo9ZK7g8LLHGWNBIQfDz8QCPR90B1UO6u6umEz2r5cu2uAEqo4hgbH2BOg8p32LJgLUwHvoU',
   'https://lh3.googleusercontent.com/sitesv/APaQ0SRT1qNoDWtIPIFj7rG8TFOIaYMRQhNiMf0E5ib47qxzOyj9Xfuo3b4dk0qKh5cps9rV7OHSJ9UesrhsRkDs9Dl0iscl7u4akdl52i1-KyCakgzhCpul_Q4Q3KBLnnepkG_qZULh-2HywozHAl576xsXg-2BXKy28EsR-jp7kS63lzTbu8QLQ8oZ8EJfo6YMcB7TV0CKMVpWuv08crD1LdiBVeQB0inuiv9f',
   'https://lh3.googleusercontent.com/sitesv/APaQ0SRpWxN65babpFho6xXrZGahCh821lZccNSr6oV7aZSC593bpwBlNwcompCXOGEQrQXSAXH1iGetZK25SNSORa9LpTg3ItwUqrugTlX1X3th4B-vxhTYjlh-Ro0EcuxJgoCzniK_A4G1zOmPZ8HjgcbaROy3GLIE-SOeD9qJ4QSuc6AAD2hGFjIA23E',
   'https://lh3.googleusercontent.com/sitesv/APaQ0STaVYokZgzUEfOFHe2g6uJaOg1KnRNAFzkqtEPfimIlf4u3DOYViojCtv0WwAfHZIq_9ClhQEG7auXh83cigDT_oLgao0IqVFHpIoW-PNS4aajB_gjhnaxvTXvtSePpfQ7gdTWMtyflTIvGU6X3-yPndeaSGqgKZAmprQvY0YL6kXCanSFuWO--ZmU',
   'https://lh3.googleusercontent.com/sitesv/APaQ0ST3tGPf0E9bmTNquoHUSCcumShDxlvQGJDhNDnMO1Gh2ZgSovGWb0TtUGyvk1LvoKFAiLkYq-Xo9uCAzY7chsFqpY_bp_gsNI61cX-8k-BaKpOqpv9WIQJubz3C1KZBdu_-B8r2O5l54nvgumeqYsm1_AReFf85TcHOCQNlrHBKa6rpUaUltV7meQA',
   'https://lh3.googleusercontent.com/sitesv/APaQ0SRcMFBWdSMGuzbNJswrkKDxLA1ygkEQURHRpSK1HbljwbY37eziJlprCguvWkt1OQZLz-MVaGPJ1D5VveqBzqpNJKKgaAOk_zx9rmvbAEISrvDxuh_UBI-pgm5OP08Mnc6oGbKSIgPn_IlKWdvrXRk8hjGKR6Qw23CUq-dNfzBM358_yg8CYxVQySfuBGlWGiIxCv9HZk9hv9DXkWjmUvfnM8axwIwBE0Qu',
   'https://lh3.googleusercontent.com/sitesv/APaQ0SRXW92CQ4L42OeDu9h8O9bskWUMnhL06Vzh_Mvtiee82yY4ZOxK0ToSucbdqbN7Pm7OJ2GtVZIBnvJEEr8uaBsoFnoWR1hfFvalCNN6bUJk2r4w-DqG8AhFsRFAxJrhbSEpfhV1SH1PMZlNWQxJY8nFUhEQYvtkWz3PLX_oBWQ8JCfTZm3ftXrZ',
   'https://lh3.googleusercontent.com/sitesv/APaQ0STXSOTcjnheXcIPH1eK1soXzETZ0nUWhDUOvT3VfydKnaXac5UokiQaSgEe3zxTqL6lc5IG7QmHaE_6TgT2rjyvQr6W83gJyvIhZy90m_O-b0uI8CZoZwNfLr77duKU1KMIqBpnQONy_ytrh8gsDRUp1KxV2k0nkSM3rLNcCJR-zMPbZjxZABapNuTjBtL2uvuK5qOm1zZ2YdOTtg_Vj_bxWZDXycXxCqD4sRU',
   'https://lh3.googleusercontent.com/sitesv/APaQ0SQuFzPdG6IxN7CllCVnjZ2uRBWiKcWjg7b9lG05TKhFZz0LqRwPIoLsAeKvtZ_z8GW4YqVaj_-MBXb9ry3HYITYNIV0tdCnxuLRtLGm3TN94JCn7JQy0sXeGh2JcaneT7JPq7OkFX_AnGjchEoEkOeJdtAKRgNUaCZu1hnL9mBVRjxJ2By9k3EtmVnDebzV2sVyxoy5MoBh8duEZs-pd8OiC0mRbAXZpQRZ',
   'https://lh3.googleusercontent.com/sitesv/APaQ0SRT1qNoDWtIPIFj7rG8TFOIaYMRQhNiMf0E5ib47qxzOyj9Xfuo3b4dk0qKh5cps9rV7OHSJ9UesrhsRkDs9Dl0iscl7u4akdl52i1-KyCakgzhCpul_Q4Q3KBLnnepkG_qZULh-2HywozHAl576xsXg-2BXKy28EsR-jp7kS63lzTbu8QLQ8oZ8EJfo6YMcB7TV0CKMVpWuv08crD1LdiBVeQB0inuiv9f'
];

const biometricMachine = [
  'https://lh3.googleusercontent.com/sitesv/APaQ0SR5FgvyCwzbkxpUFa0xrDUedDsKDPvoSxOeLPoSdiJ-CjrsEHRb4T5m18G3hM-ohICILxheQ4LTWODmU-Jeph9nSDlob9J6hf4a3vKpt3zWRTICkmZQ5URAEtjDMxTexUTD3KEYhZx99DXmnRmnx40aWTVEFHgUjObiWVbCt0cpskCA8Do7YLsnrAM',
  'https://lh3.googleusercontent.com/sitesv/APaQ0SRHDlH_CpG2mSISytoFYhB8_h5uNxuJRwrT7YbdAv1BGXUS41r0C1Sci_qzxoR1cWlCT_HADufsg8ZuBGmUGK584vTLrRQsDgUamu8LWOu5ehMNN2O8VEa4VN2r2HrjGtc0ggKM9qlTbOcbjJr__6R4JntVEQwwijwLE9lAL2fq1VUVGAElH3bJ',
  'https://lh3.googleusercontent.com/sitesv/APaQ0ST2IGQ_FLlGcMAUmuswVxl5NHFyUSU7AtuQLzZdFMtegJlI_OGxgtfioL4X6p36CzV_wq7BLv3pBL-70Quxj0DMnC7AvDZtqeBjnyrGGQ0Y6GQwL82H7RDUnotwYXZMMcuNVgGIW53QWdwQ8HGemLZhMNs-Z0FQFpA1rAIeDp_GigRlU9b0Qjhgl_g',
  'https://lh3.googleusercontent.com/sitesv/APaQ0SQWv1sysX-_ssCAw0Nr4g0DOZQH-ao6R-t19TYULEoX_h8jtm_2_Os4lneDwbwkmDsYT7FZi3qxf5e2P9Mp2QJ93WnoXjQNjGsgHUyGg5agAaAuBtp2UsV4h_f9NkhTB66SL5TVUAGj3NaF0f7lyWTg6FN36jpg3-BsWSpoWY_F_ecMFVxuVftvpgM'
];

const alcoholTester=[
    'https://lh3.googleusercontent.com/sitesv/APaQ0STPogszP_hNPFGPxgUyBNbNyG97zwNgvOXCvqOEa6DSissIWiA5a-QibA1xDiEBm2yzY2T2vftLWh49cTFKEFDDSnX-zhyT4H6WDMQn0AgATvc5l5ddgCmfajWlY1jCj09-HRz5RXnXEqFWyD5rdC31lDYxzOEI4BH8LBHkt-Q5H8laW8VJ25orTAA',
    'https://lh3.googleusercontent.com/sitesv/APaQ0SSBGFiglF5N63-xeKxYMZQ_Hwv91naDkVrZPyiNo3g7INZyOlae6IfhUAOWRWZwwuUkrt9R0JM9FyQ1HCqHuta4jjgvr4N3E0Cru9gv90ogAflSi6ftfMjmvvGTHJkYccztuhreb1bx00egzEFK8owvLghLyVknMw1bN277Xp0_SD_n8f2CdNcT',
    'https://lh3.googleusercontent.com/sitesv/APaQ0SSQuHwpceErnIiFFvobuoZAj8PW29d2W8lNdN5eDrWubU0Z0DxtOWL7aOKETTjM9qM5MDXfoB95wK6gnFimhO7coEtqAUKL3gnG4J7nuF1A8i7p93uXicqLUIo3FhFii5jDZ-ivkA6tBG5GlvTbLSXcd9JlpjigndipM8NCAO1Dq662HNlTVpfo'
];

const moneyCounter=[
    'https://lh3.googleusercontent.com/sitesv/APaQ0STIMcjHNkcNtJRNLO_tmemV9HamA_8OgkIBsqrsxYErE3KPIJojWKA2K6wreZ0ruXBMYTEc_q9JsdEuQptyfFZD7HTMeIU8RUMhVHsOp8d3GBB7nCVWJdzNo6VESNT0wfb64oJY8iMAPM5y2AQAQUGLj4GHHkq6ijkKw-QjZaMP41CwFSZIjfqtOMFcSKXI0JmGFL9bay3LPWnfSJIEiH0nM2RwoZrd6jm8NCM',
    'https://lh3.googleusercontent.com/sitesv/APaQ0STSlF9jEE-6AOLUfBR6zju230796wMI8rc1Q84mfa7zFO-I2ZUZTJOcBLXNnFrfsW_0HIoPku9ORsrjLwM93FLlr93qDWlMAB9evcb9y0OAU5W7CyNmyZY21UgmvW1IauFem2fGlguaB7aRZgHfI26SyTIeMVCYFpNfB5_HyvRi3AYUf2R8gTr4zo9oiisg0_uLX0Fhmrhdpy_Up_vPxYNdB1GrnZlosqoZ9Jg',
    'https://lh3.googleusercontent.com/sitesv/APaQ0SQmQfdN3-qoAExMhyYyc0MLxm23Uhy3lR12T-ZFil7yBTdhLGUtoxwNMeVqqfWin6Fb3GEs90JT2-IGvmf9iC8aH-Dg96a0v5-fILE8s79oyl0dZeSx_do7-ITo30cu5kwbTqw3GO2UwqWHwmmioJk_5IRLuBZqPk8lFZtAMa8JKANXf1HcG7rLeRwx7xCnk2Go9qNXorl0VksdZnKkIdubil5wYfrV9_1wyyQ'
];

//walkie talkies
const baofengv8=[
'https://drive.google.com/thumbnail?id=1w206bVq6_TQs_U_R1Z2PrCPIDBO1BmVl&sz',
'https://drive.google.com/thumbnail?id=1ILFdyR_AExltDSbGrqIjE279hv1tY36v&sz',
'https://drive.google.com/thumbnail?id=1i4AbowMXUpUC4gEu72dY52sHIKFNocMk&sz',
'https://drive.google.com/thumbnail?id=1w206bVq6_TQs_U_R1Z2PrCPIDBO1BmVl&sz',
'https://drive.google.com/thumbnail?id=18y-GJStw6PYNgL9YKZIqdxiYDeI0RTm7&sz',
'https://drive.google.com/thumbnail?id=1cz3wI8ADn-wc2uFjT9nF-CSG2NJo3JQ7&sz',
'https://drive.google.com/thumbnail?id=1kkH42QKkQTdkS15DoBLhdb2_0tbz5kMd&sz',
'https://drive.google.com/thumbnail?id=1dVENN7vVyu_4WgObzQ_ZnhcUCiQf3S2D&sz',
'https://drive.google.com/thumbnail?id=1bRTyFvKHfuvzIieWOnrFlMX2De-N-MPs&sz',
'https://drive.google.com/thumbnail?id=1wC2I6MlSIBynC-FJH4ZxTj-BoCs95mXX&sz'
];






const downloadImages = async () => {
    const downloadFolder = path.join(__dirname, 'downloaded_images');
    
    // Create folder if it doesn't exist
    if (!fs.existsSync(downloadFolder)) {
        fs.mkdirSync(downloadFolder);
    }

    console.log("🚀 Starting download...");

    for (let i = 0; i < thermalPrinter.length; i++) {
        try {
            const url = thermalPrinter[i];
            
            const fileName = `product_${i + 1}.png`; 
            const filePath = path.join(downloadFolder, fileName);

            const response = await axios({
                url,
                method: 'GET',
                responseType: 'stream',
            });

            const writer = fs.createWriteStream(filePath);
            response.data.pipe(writer);

            writer.on('finish', () => console.log(`✅ Saved: ${fileName}`));
            writer.on('error', (err) => console.error('❌ Error writing file', err));

        } catch (error) {
            console.error(`❌ Failed to download image ${i + 1}`);
        }
    }
};

downloadImages(); 