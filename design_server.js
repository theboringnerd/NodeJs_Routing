/*
API Designing message

POST
//transaction/type/POST
//transaction/type/service/POST
//
/user/{phonenumber, password} = [user.amount, user.phonenumber, user.auth_key, user.id]
/user/3/transaction/refill/{amount} = [transaction.status_code, transaction.id]
/user/3/transaction/withdraw/{amount} = [transaction.status_code, transaction.id]
/user/3/transaction/transfer/[money, sms]/{amount, receipient} = [transaction.status_code, transaction.id]


GET
transaction {type, service, status, details['whatever passed through as query']}
/user/3/transaction/ = [container<transaction>]
/user/3/ = [user.amount, user.phonenumber]


PUT
/user/3/phonenumber/{details}
/user/3/password/{details}

DELETE
/user/3/




Object Designs

User
id, amount, phonenumber, auth_key
is_user(), create(), find(), update(), delete()

Transaction
id, type, service, status, details
is_transaction(), create(), find(), update(), delete()
 *
 *
 *
 *
 *
 *
 */



