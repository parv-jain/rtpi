# rtpi-api
rtpi keep track of price of ecommerce products

# setting up:

1. change directory to project folder.
2. use npm install command to install required packages.

__Base url:__ ```localhost:3000```

# Fetch flipkart product details: localhost:3000/flipkart
__Request Body:__
```json
{
	"url": "https://www.flipkart.com/indian-history-civil-services-examinations-second/p/itmczyz2zpjqw9fk?pid=9789352606627&srno=b_1_1&otracker=browse&lid=LSTBOK9789352606627MFVNXJ&iid=9a769618-94df-49b2-8dd0-cd7e4f39e51e.9789352606627.SEARCH"
}
```

# Fetch amazon product details: localhost:3000/amazon/products
__Request Body:__
```json
{
	"url":"https://www.amazon.in/gp/product/B01D4EYNUG/ref=s9_acsd_top_hd_bw_b1W0qP9_c_x_w?pf_rd_m=A1VBAL9TL5WCBF&pf_rd_s=merchandised-search-5&pf_rd_r=JYP35Z1MV7602MPYQX2B&pf_rd_t=101&pf_rd_p=af2ecbe3-08d0-53c8-ba31-685e2fab7485&pf_rd_i=1389177031"
}
```
# Fetch amazon books details: localhost:3000/amazon/books
__Request Body:__
```json
{
	"url": "https://www.amazon.in/gp/product/0070597715/ref=s9_acsd_newrz_hd_bw_b1RCUE3_c_x_w?pf_rd_m=A1VBAL9TL5WCBF&pf_rd_s=merchandised-search-11&pf_rd_r=T9E8WC4CPRX3CAKJ8MB4&pf_rd_t=101&pf_rd_p=3fafc586-6633-5078-abec-715e63fa7e0c&pf_rd_i=1318070031"
}
```
# send mail template: localhost:3000/sendMail
__Request Body:__
```json
{
	"to": "parvjn616@gmail.com",
	"subject": "Notification Mail From RTPI",
	"message": "Hey, This is Test case"
}
```
# other calls
1. Login page: localhost:3000/auth <br>
2. User page: loclahost:3000/user <br>
3. fb login: localhost:3000/auth/facebook <br>
4. fb login callback: localhost:3000/auth/facebook/callback <br>
5. google login: localhost:3000/auth/google <br>
6. google login callback: localhost:3000/auth/google/callback <br>
