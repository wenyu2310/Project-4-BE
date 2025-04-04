# Developing a 'Company Ideas Incubator Tool' 
<img width="552" alt="Screenshot 2025-04-04 at 11 20 32 PM" src="https://github.com/user-attachments/assets/04383883-4f39-4425-80bc-b1f946b1acd7" />

## Link to Site
www.parkitect.vercel.app

## Project Brief
'Parkitect':Engaging the Public Early and Often- Because GreatSpaces Are Built Together.
The tool will provide a platform for
1. Structured Engagement - Enable participation from the project start through a user-friendly platform, 
2. Transparent Communication- Provides regular project timeline and design updates, shows how public input shapes decisions
3. Community Investment-  Documents community participation through development, build a sense of ownership by co-creating spaces

## Timeframe
3 weeks
  
## Data Entities
User Schema
```
{
  id             Int           @id @default(autoincrement())
  email          String        @unique @db.VarChar(50)
  gender         Gender
  dateOfBirth    DateTime      @db.Date
  address        String        @db.VarChar(225)
  contactNumber  String        @db.VarChar(20)
  hashedPassword String        @db.VarChar(100)
  name           String        @db.VarChar(50)
  feedbacks      Feedback[]
  mailinglist    MailingList[]
  proposals      Proposal[]
},
```
Admin Schema
```
{
  id             Int    @id @default(autoincrement())
  email          String @unique @db.VarChar(50)
  name           String        @db.VarChar(50)
  hashedPassword String @db.VarChar(100)
},
```
Park Schema 
```
  {
  id               Int           @id @default(autoincrement())
  name             String        @unique @db.VarChar(50)
  description      String
  targetCompletion DateTime      @db.Date
  status           Int
  plan             String
  perspective      String
  stage            String        @db.VarChar(100)
  feedbacks        Feedback[]
  mailinglist      MailingList[]
  proposals        Proposal[]
}
```
Feedback Schema
```
  {
  id        Int       @id @default(autoincrement())
  subject   String    @db.VarChar(250)
  text      String
  createdAt DateTime?
  userId    Int
  parkId    Int
  park      Park      @relation(fields: [parkId], references: [id])
  user      User      @relation(fields: [userId], references: [id])
};
```

MailingList Schema
```
  {
  id        Int       @id @default(autoincrement())
  createdAt DateTime?
  userId    Int
  parkId    Int
  park      Park      @relation(fields: [parkId], references: [id])
  user      User      @relation(fields: [userId], references: [id])
};
```

## CRUD Functions
1. User- Create, Read
2. Admin- Create, Read 
3. Park- Create, Read, Update, and Delete
4. Proposal- Create, Read, Update, and Delete,
5. Feedback- Create, Read 
6. MailingList- Create, Read 

## MVP- Minimum Viable Product
1. At least 3 data entities components
2. The back-end application is built with Express and Node.
3. Prisma and Supabase used as the database management system.
4. The back-end and front-end applications implement JWT token-based authentication to sign up, sign in, and sign out users.
5. Authorization is implemented across the front-end and back-end. Guest users (those not signed in) should not be able to create, update, or delete data in the application or access functionality allowing those actions.
6. The project has at least two data entities in addition to the User model. At least one entity must have a relationship with the User model.
7. The project has full CRUD functionality on both the back-end and front-end.
8. The front-end application does not hold any secret keys. Public APIs that require secret keys must be accessed from the back-end application.


## Planned future enhancements
- Propoal - Post documents / images
- Improve schema for Users

## Reflections
- The good : understanding and deploying single web application for both Admin and User
- The bad: unsure of initial models, under-estimating tasks
