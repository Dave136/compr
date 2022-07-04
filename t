[1mdiff --git a/packages/server/package.json b/packages/server/package.json[m
[1mindex f550f10..0374d33 100644[m
[1m--- a/packages/server/package.json[m
[1m+++ b/packages/server/package.json[m
[36m@@ -24,10 +24,15 @@[m
     "@nestjs/common": "^8.1.1",[m
     "@nestjs/core": "^8.1.1",[m
     "@nestjs/graphql": "^10.0.16",[m
[32m+[m[32m    "@nestjs/jwt": "^8.0.1",[m
[32m+[m[32m    "@nestjs/passport": "^8.2.2",[m
     "@nestjs/platform-express": "^8.1.1",[m
     "apollo-server-express": "^3.9.0",[m
     "class-validator": "^0.13.2",[m
     "graphql": "^16.5.0",[m
[32m+[m[32m    "passport": "^0.6.0",[m
[32m+[m[32m    "passport-jwt": "^4.0.0",[m
[32m+[m[32m    "passport-local": "^1.0.0",[m
     "reflect-metadata": "^0.1.13",[m
     "rimraf": "^3.0.2",[m
     "rxjs": "^7.4.0"[m
[36m@@ -39,6 +44,8 @@[m
     "@types/express": "^4.17.13",[m
     "@types/jest": "^27.0.2",[m
     "@types/node": "^16.11.1",[m
[32m+[m[32m    "@types/passport-jwt": "^3.0.6",[m
[32m+[m[32m    "@types/passport-local": "^1.0.34",[m
     "@types/supertest": "^2.0.11",[m
     "@typescript-eslint/eslint-plugin": "^4.29.2",[m
     "@typescript-eslint/parser": "^4.29.2",[m
[1mdiff --git a/packages/server/src/app.module.ts b/packages/server/src/app.module.ts[m
[1mindex 90b4e35..628cd38 100644[m
[1m--- a/packages/server/src/app.module.ts[m
[1m+++ b/packages/server/src/app.module.ts[m
[36m@@ -2,12 +2,14 @@[m [mimport { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';[m
 import { Module } from '@nestjs/common';[m
 import { GraphQLModule } from '@nestjs/graphql';[m
 import { join } from 'path';[m
[32m+[m[32mimport { AuthModule } from './modules/auth/auth.module';[m
 import { UserModule } from './modules/user/user.module';[m
 // import { AppController } from './app.controller';[m
 // import { AppService } from './app.service';[m
 [m
 @Module({[m
   imports: [[m
[32m+[m[32m    AuthModule,[m
     UserModule,[m
     GraphQLModule.forRoot<ApolloDriverConfig>({[m
       driver: ApolloDriver,[m
[1mdiff --git a/packages/server/src/modules/user/user.service.ts b/packages/server/src/modules/user/user.service.ts[m
[1mindex 1792a86..89babf2 100644[m
[1m--- a/packages/server/src/modules/user/user.service.ts[m
[1m+++ b/packages/server/src/modules/user/user.service.ts[m
[36m@@ -23,4 +23,8 @@[m [mexport class UserService {[m
   public getUsers(getUsersArgs: GetUsersArgs): User[] {[m
     return getUsersArgs.userIds.map((id) => this.getUser({ id }));[m
   }[m
[32m+[m
[32m+[m[32m  public getUserByEmail(email: string): User {[m
[32m+[m[32m    return this.users.find((user) => user.email === email);[m
[32m+[m[32m  }[m
 }[m
[1mdiff --git a/packages/server/src/schema.gql b/packages/server/src/schema.gql[m
[1mindex 1aa17e8..b11dabc 100644[m
[1m--- a/packages/server/src/schema.gql[m
[1m+++ b/packages/server/src/schema.gql[m
[36m@@ -10,7 +10,20 @@[m [mtype User {[m
   password: String![m
 }[m
 [m
[32m+[m[32mtype AuthResponse {[m
[32m+[m[32m  accessToken: String![m
[32m+[m[32m}[m
[32m+[m
 type Query {[m
   user(id: String!): User![m
   users(userIds: [String!]!): [User]![m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mtype Mutation {[m
[32m+[m[32m  login(loginInput: LoginInput!): AuthResponse![m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32minput LoginInput {[m
[32m+[m[32m  email: String![m
[32m+[m[32m  password: String![m
 }[m
\ No newline at end of file[m
[1mdiff --git a/pnpm-lock.yaml b/pnpm-lock.yaml[m
[1mindex 1597c95..2093d1d 100644[m
[1m--- a/pnpm-lock.yaml[m
[1m+++ b/pnpm-lock.yaml[m
[36m@@ -47,12 +47,16 @@[m [mimporters:[m
       '@nestjs/common': ^8.1.1[m
       '@nestjs/core': ^8.1.1[m
       '@nestjs/graphql': ^10.0.16[m
[32m+[m[32m      '@nestjs/jwt': ^8.0.1[m
[32m+[m[32m      '@nestjs/passport': ^8.2.2[m
       '@nestjs/platform-express': ^8.1.1[m
       '@nestjs/schematics': ^8.0.4[m
       '@nestjs/testing': ^8.1.1[m
       '@types/express': ^4.17.13[m
       '@types/jest': ^27.0.2[m
       '@types/node': ^16.11.1[m
[32m+[m[32m      '@types/passport-jwt': ^3.0.6[m
[32m+[m[32m      '@types/passport-local': ^1.0.34[m
       '@types/supertest': ^2.0.11[m
       '@typescript-eslint/eslint-plugin': ^4.29.2[m
       '@typescript-eslint/parser': ^4.29.2[m
[36m@@ -63,6 +67,9 @@[m [mimporters:[m
       eslint-plugin-prettier: ^3.4.1[m
       graphql: ^16.5.0[m
       jest: ^27.3.0[m
[32m+[m[32m      passport: ^0.6.0[m
[32m+[m[32m      passport-jwt: ^4.0.0[m
[32m+[m[32m      passport-local: ^1.0.0[m
       prettier: ^2.4.1[m
       reflect-metadata: ^0.1.13[m
       rimraf: ^3.0.2[m
[36m@@ -79,10 +86,15 @@[m [mimporters:[m
       '@nestjs/common': 8.4.7_ilikvm6h45uttjv3bneyjhbbs4[m
       '@nestjs/core': 8.4.7_fkqgj3xrohk2pflugljc4sz7ea[m
       '@nestjs/graphql': 10.0.16_aogknz4krhhezmehkgaajyurd4[m
[32m+[m[32m      '@nestjs/jwt': 8.0.1_@nestjs+common@8.4.7[m
[32m+[m[32m      '@nestjs/passport': 8.2.2_ajebcnomotz225cztrmzhvaeiq[m
       '@nestjs/platform-express': 8.4.7_7tsmhnugyerf5okgqzer2mfqme[m
       apollo-server-express: 3.9.0_graphql@16.5.0[m
       class-validator: 0.13.2[m
       graphql: 16.5.0[m
[32m+[m[32m      passport: 0.6.0[m
[32m+[m[32m      passport-jwt: 4.0.0[m
[32m+[m[32m      passport-local: 1.0.0[m
       reflect-metadata: 0.1.13[m
       rimraf: 3.0.2[m
       rxjs: 7.5.5[m
[36m@@ -93,6 +105,8 @@[m [mimporters:[m
       '@types/express': 4.17.13[m
       '@types/jest': 27.5.2[m
       '@types/node': 16.11.42[m
[32m+[m[32m      '@types/passport-jwt': 3.0.6[m
[32m+[m[32m      '@types/passport-local': 1.0.34[m
       '@types/supertest': 2.0.12[m
       '@typescript-eslint/eslint-plugin': 4.33.0_3ekaj7j3owlolnuhj3ykrb7u7i[m
       '@typescript-eslint/parser': 4.33.0_hxadhbs2xogijvk7vq4t2azzbu[m
[36m@@ -1242,6 +1256,16 @@[m [mpackages:[m
       - utf-8-validate[m
     dev: false[m
 [m
[32m+[m[32m  /@nestjs/jwt/8.0.1_@nestjs+common@8.4.7:[m
[32m+[m[32m    resolution: {integrity: sha512-9WGfgngX8aclC/MC+CH35Ooo4iPVKc+7xLXaBV6o4ty8g2uZdPomry7cSdK/e6Lv623O/84WapThnPoAtW/jvA==}[m
[32m+[m[32m    peerDependencies:[m
[32m+[m[32m      '@nestjs/common': ^6.0.0 || ^7.0.0 || ^8.0.0[m
[32m+[m[32m    dependencies:[m
[32m+[m[32m      '@nestjs/common': 8.4.7_ilikvm6h45uttjv3bneyjhbbs4[m
[32m+[m[32m      '@types/jsonwebtoken': 8.5.8[m
[32m+[m[32m      jsonwebtoken: 8.5.1[m
[32m+[m[32m    dev: false[m
[32m+[m
   /@nestjs/mapped-types/1.0.1_qfkux2cboypkfugdtf5tuifnci:[m
     resolution: {integrity: sha512-NFvofzSinp00j5rzUd4tf+xi9od6383iY0JP7o0Bnu1fuItAUkWBgc4EKuIQ3D+c2QI3i9pG1kDWAeY27EMGtg==}[m
     peerDependencies:[m
[36m@@ -1260,6 +1284,16 @@[m [mpackages:[m
       reflect-metadata: 0.1.13[m
     dev: false[m
 [m
[32m+[m[32m  /@nestjs/passport/8.2.2_ajebcnomotz225cztrmzhvaeiq:[m
[32m+[m[32m    resolution: {integrity: sha512-Ytbn8j7WZ4INmEntOpdJY1isTgdQqZkx5ADz8zsZ5wAp0t8tc5GF/A+GlXlmn9/yRPwZHSbmHpv7Qt2EIiNnrw==}[m
[32m+[m[32m    peerDependencies:[m
[32m+[m[32m      '@nestjs/common': ^6.0.0 || ^7.0.0 || ^8.0.0[m
[32m+[m[32m      passport: ^0.4.0 || ^0.5.0 || ^0.6.0[m
[32m+[m[32m    dependencies:[m
[32m+[m[32m      '@nestjs/common': 8.4.7_ilikvm6h45uttjv3bneyjhbbs4[m
[32m+[m[32m      passport: 0.6.0[m
[32m+[m[32m    dev: false[m
[32m+[m
   /@nestjs/platform-express/8.4.7_7tsmhnugyerf5okgqzer2mfqme:[m
     resolution: {integrity: sha512-lPE5Ltg2NbQGRQIwXWY+4cNrXhJdycbxFDQ8mNxSIuv+LbrJBIdEB/NONk+LLn9N/8d2+I2LsIETGQrPvsejBg==}[m
     peerDependencies:[m
[36m@@ -1642,6 +1676,11 @@[m [mpackages:[m
     resolution: {integrity: sha512-dRLjCWHYg4oaA77cxO64oO+7JwCwnIzkZPdrrC71jQmQtlhM556pwKo5bUzqvZndkVbeFLIIi+9TC40JNF5hNQ==}[m
     dev: true[m
 [m
[32m+[m[32m  /@types/jsonwebtoken/8.5.8:[m
[32m+[m[32m    resolution: {integrity: sha512-zm6xBQpFDIDM6o9r6HSgDeIcLy82TKWctCXEPbJJcXb5AKmi5BNNdLXneixK4lplX3PqIVcwLBCGE/kAGnlD4A==}[m
[32m+[m[32m    dependencies:[m
[32m+[m[32m      '@types/node': 18.0.0[m
[32m+[m
   /@types/long/4.0.2:[m
     resolution: {integrity: sha512-MqTGEo5bj5t157U6fA/BiDynNkn0YknVdh48CMPkTSpFTVmvao5UQmm7uEF6xBEo7qIMAlY/JSleYaE6VOdpaA==}[m
     dev: false[m
[36m@@ -1664,6 +1703,35 @@[m [mpackages:[m
     resolution: {integrity: sha512-//oorEZjL6sbPcKUaCdIGlIUeH26mgzimjBB77G6XRgnDl/L5wOnpyBGRe/Mmf5CVW3PwEBE1NjiMZ/ssFh4wA==}[m
     dev: true[m
 [m
[32m+[m[32m  /@types/passport-jwt/3.0.6:[m
[32m+[m[32m    resolution: {integrity: sha512-cmAAMIRTaEwpqxlrZyiEY9kdibk94gP5KTF8AT1Ra4rWNZYHNMreqhKUEeC5WJtuN5SJZjPQmV+XO2P5PlnvNQ==}[m
[32m+[m[32m    dependencies:[m
[32m+[m[32m      '@types/express': 4.17.13[m
[32m+[m[32m      '@types/jsonwebtoken': 8.5.8[m
[32m+[m[32m      '@types/passport-strategy': 0.2.35[m
[32m+[m[32m    dev: true[m
[32m+[m
[32m+[m[32m  /@types/passport-local/1.0.34:[m
[32m+[m[32m    resolution: {integrity: sha512-PSc07UdYx+jhadySxxIYWuv6sAnY5e+gesn/5lkPKfBeGuIYn9OPR+AAEDq73VRUh6NBTpvE/iPE62rzZUslog==}[m
[32m+[m[32m    dependencies:[m
[32m+[m[32m      '@types/express': 4.17.13[m
[32m+[m[32m      '@types/passport': 1.0.9[m
[32m+[m[32m      '@types/passport-strategy': 0.2.35[m
[32m+[m[32m    dev: true[m
[32m+[m
[32m+[m[32m  /@types/passport-strategy/0.2.35:[m
[32m+[m[32m    resolution: {integrity: sha512-o5D19Jy2XPFoX2rKApykY15et3Apgax00RRLf0RUotPDUsYrQa7x4howLYr9El2mlUApHmCMv5CZ1IXqKFQ2+g==}[m
[32m+[m[32m    dependencies:[m
[32m+[m[32m      '@types/express': 4.17.13[m
[32m+[m[32m      '@types/passport': 1.0.9[m
[32m+[m[32m    dev: true[m
[32m+[m
[32m+[m[32m  /@types/passport/1.0.9:[m
[32m+[m[32m    resolution: {integrity: sha512-9+ilzUhmZQR4JP49GdC2O4UdDE3POPLwpmaTC/iLkW7l0TZCXOo1zsTnnlXPq6rP1UsUZPfbAV4IUdiwiXyC7g==}[m
[32m+[m[32m    dependencies:[m
[32m+[m[32m      '@types/express': 4.17.13[m
[32m+[m[32m    dev: true[m
[32m+[m
   /@types/prettier/2.6.3:[m
     resolution: {integrity: sha512-ymZk3LEC/fsut+/Q5qejp6R9O1rMxz3XaRHDV6kX8MrGAhOSPqVARbDi+EZvInBpw+BnCX3TD240byVkOfQsHg==}[m
     dev: true[m
[36m@@ -2613,6 +2681,10 @@[m [mpackages:[m
     resolution: {integrity: sha512-VO9Ht/+p3SN7SKWqcrgEzjGbRSJYTx+Q1pTQC0wrWqHx0vpJraQ6GtHx8tvcg1rlK1byhU5gccxgOgj7B0TDkQ==}[m
     dev: true[m
 [m
[32m+[m[32m  /buffer-equal-constant-time/1.0.1:[m
[32m+[m[32m    resolution: {integrity: sha512-zRpUiDwd/xk6ADqPMATG8vc9VPrkck7T07OIx0gnjmJAnHnTVXNQG3vfvWNuiZIkwu9KrKdA1iJKfsfTVxE6NA==}[m
[32m+[m[32m    dev: false[m
[32m+[m
   /buffer-from/1.1.2:[m
     resolution: {integrity: sha512-E+XQCRwSbaaiChtv6k6Dwgc+bx+Bs6vuKJHHl5kox/BaKbhiXzqQOwK4cO22yElGp2OCmjwVhT3HmxgyPGnJfQ==}[m
 [m
[36m@@ -3072,6 +3144,12 @@[m [mpackages:[m
       webidl-conversions: 5.0.0[m
     dev: true[m
 [m
[32m+[m[32m  /ecdsa-sig-formatter/1.0.11:[m
[32m+[m[32m    resolution: {integrity: sha512-nagl3RYrbNv6kQkeJIpt6NJZy8twLB/2vtz6yN9Z4vRKHN4/QZJIEbqohALSgwKdnksuY3k5Addp5lg8sVoVcQ==}[m
[32m+[m[32m    dependencies:[m
[32m+[m[32m      safe-buffer: 5.2.1[m
[32m+[m[32m    dev: false[m
[32m+[m
   /ee-first/1.1.1:[m
     resolution: {integrity: sha512-WMwm9LhRUo+WUaRN+vRuETqG89IgZphVSNkdFgeb6sS/E4OrDIN7t48CAewSHXc6C8lefD8KKfr5vY61brQlow==}[m
 [m
[36m@@ -4986,6 +5064,37 @@[m [mpackages:[m
       graceful-fs: 4.2.10[m
     dev: true[m
 [m
[32m+[m[32m  /jsonwebtoken/8.5.1:[m
[32m+[m[32m    resolution: {integrity: sha512-XjwVfRS6jTMsqYs0EsuJ4LGxXV14zQybNd4L2r0UvbVnSF9Af8x7p5MzbJ90Ioz/9TI41/hTCvznF/loiSzn8w==}[m
[32m+[m[32m    engines: {node: '>=4', npm: '>=1.4.28'}[m
[32m+[m[32m    dependencies:[m
[32m+[m[32m      jws: 3.2.2[m
[32m+[m[32m      lodash.includes: 4.3.0[m
[32m+[m[32m      lodash.isboolean: 3.0.3[m
[32m+[m[32m      lodash.isinteger: 4.0.4[m
[32m+[m[32m      lodash.isnumber: 3.0.3[m
[32m+[m[32m      lodash.isplainobject: 4.0.6[m
[32m+[m[32m      lodash.isstring: 4.0.1[m
[32m+[m[32m      lodash.once: 4.1.1[m
[32m+[m[32m      ms: 2.1.3[m
[32m+[m[32m      semver: 5.7.1[m
[32m+[m[32m    dev: false[m
[32m+[m
[32m+[m[32m  /jwa/1.4.1:[m
[32m+[m[32m    resolution: {integrity: sha512-qiLX/xhEEFKUAJ6FiBMbes3w9ATzyk5W7Hvzpa/SLYdxNtng+gcurvrI7TbACjIXlsJyr05/S1oUhZrc63evQA==}[m
[32m+[m[32m    dependencies:[m
[32m+[m[32m      buffer-equal-constant-time: 1.0.1[m
[32m+[m[32m      ecdsa-sig-formatter: 1.0.11[m
[32m+[m[32m      safe-buffer: 5.2.1[m
[32m+[m[32m    dev: false[m
[32m+[m
[32m+[m[32m  /jws/3.2.2:[m
[32m+[m[32m    resolution: {integrity: sha512-YHlZCB6lMTllWDtSPHz/ZXTsi8S00usEV6v1tjq8tOUZzw7DpSDWVXjXDre6ed1w/pd495ODpHZYSdkRTsa0HA==}[m
[32m+[m[32m    dependencies:[m
[32m+[m[32m      jwa: 1.4.1[m
[32m+[m[32m      safe-buffer: 5.2.1[m
[32m+[m[32m    dev: false[m
[32m+[m
   /kleur/3.0.3:[m
     resolution: {integrity: sha512-eTIzlVOSUR+JxdDFepEYcBMtZ9Qqdef+rnzWdRZuMbOywu5tO2w2N7rqjoANZ5k9vywhL6Br1VRjUIgTQx4E8w==}[m
     engines: {node: '>=6'}[m
[36m@@ -5036,6 +5145,30 @@[m [mpackages:[m
       p-locate: 4.1.0[m
     dev: true[m
 [m
[32m+[m[32m  /lodash.includes/4.3.0:[m
[32m+[m[32m    resolution: {integrity: sha512-W3Bx6mdkRTGtlJISOvVD/lbqjTlPPUDTMnlXZFnVwi9NKJ6tiAk6LVdlhZMm17VZisqhKcgzpO5Wz91PCt5b0w==}[m
[32m+[m[32m    dev: false[m
[32m+[m
[32m+[m[32m  /lodash.isboolean/3.0.3:[m
[32m+[m[32m    resolution: {integrity: sha512-Bz5mupy2SVbPHURB98VAcw+aHh4vRV5IPNhILUCsOzRmsTmSQ17jIuqopAentWoehktxGd9e/hbIXq980/1QJg==}[m
[32m+[m[32m    dev: false[m
[32m+[m
[32m+[m[32m  /lodash.isinteger/4.0.4:[m
[32m+[m[32m    resolution: {integrity: sha512-DBwtEWN2caHQ9/imiNeEA5ys1JoRtRfY3d7V9wkqtbycnAmTvRRmbHKDV4a0EYc678/dia0jrte4tjYwVBaZUA==}[m
[32m+[m[32m    dev: false[m
[32m+[m
[32m+[m[32m  /lodash.isnumber/3.0.3:[m
[32m+[m[32m    resolution: {integrity: sha512-QYqzpfwO3/CWf3XP+Z+tkQsfaLL/EnUlXWVkIk5FUPc4sBdTehEqZONuyRt2P67PXAk+NXmTBcc97zw9t1FQrw==}[m
[32m+[m[32m    dev: false[m
[32m+[m
[32m+[m[32m  /lodash.isplainobject/4.0.6:[m
[32m+[m[32m    resolution: {integrity: sha512-oSXzaWypCMHkPC3NvBEaPHf0KsA5mvPrOPgQWDsbg8n7orZ290M0BmC/jgRZ4vcJ6DTAhjrsSYgdsW/F+MFOBA==}[m
[32m+[m[32m    dev: false[m
[32m+[m
[32m+[m[32m  /lodash.isstring/4.0.1:[m
[32m+[m[32m    resolution: {integrity: sha512-0wJxfxH1wgO3GrbuP+dTTk7op+6L41QCXbGINEmD+ny/G/eCqGzxyCsh7159S+mgDDcoarnBw6PC1PS5+wUGgw==}[m
[32m+[m[32m    dev: false[m
[32m+[m
   /lodash.memoize/4.1.2:[m
     resolution: {integrity: sha512-t7j+NzmgnQzTAYXcsHYLgimltOV1MXHtlOWf6GjL9Kj8GK5FInw5JotxvbOs+IvV1/Dzo04/fCGfLVs7aXb4Ag==}[m
     dev: true[m
[36m@@ -5048,6 +5181,10 @@[m [mpackages:[m
     resolution: {integrity: sha512-XeqSp49hNGmlkj2EJlfrQFIzQ6lXdNro9sddtQzcJY8QaoC2GO0DT7xaIokHeyM+mIT0mPMlPvkYzg2xCuHdZg==}[m
     dev: false[m
 [m
[32m+[m[32m  /lodash.once/4.1.1:[m
[32m+[m[32m    resolution: {integrity: sha512-Sb487aTOCr9drQVL8pIxOzVhafOjZN9UU54hiN8PU3uAiSV7lx1yYNpbNmex2PK6dSJoNTSJUUswT651yww3Mg==}[m
[32m+[m[32m    dev: false[m
[32m+[m
   /lodash.sortby/4.7.0:[m
     resolution: {integrity: sha512-HDWXG8isMntAyRF5vZ7xKuEvOhT4AhlRt/3czTSjvGUxjYCBVRQY48ViDHyfYz9VIoBkW4TMGQNapx+l3RUwdA==}[m
     dev: false[m
[36m@@ -5564,6 +5701,34 @@[m [mpackages:[m
     resolution: {integrity: sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ==}[m
     engines: {node: '>= 0.8'}[m
 [m
[32m+[m[32m  /passport-jwt/4.0.0:[m
[32m+[m[32m    resolution: {integrity: sha512-BwC0n2GP/1hMVjR4QpnvqA61TxenUMlmfNjYNgK0ZAs0HK4SOQkHcSv4L328blNTLtHq7DbmvyNJiH+bn6C5Mg==}[m
[32m+[m[32m    dependencies:[m
[32m+[m[32m      jsonwebtoken: 8.5.1[m
[32m+[m[32m      passport-strategy: 1.0.0[m
[32m+[m[32m    dev: false[m
[32m+[m
[32m+[m[32m  /passport-local/1.0.0:[m
[32m+[m[32m    resolution: {integrity: sha512-9wCE6qKznvf9mQYYbgJ3sVOHmCWoUNMVFoZzNoznmISbhnNNPhN9xfY3sLmScHMetEJeoY7CXwfhCe7argfQow==}[m
[32m+[m[32m    engines: {node: '>= 0.4.0'}[m
[32m+[m[32m    dependencies:[m
[32m+[m[32m      passport-strategy: 1.0.0[m
[32m+[m[32m    dev: false[m
[32m+[m
[32m+[m[32m  /passport-strategy/1.0.0:[m
[32m+[m[32m    resolution: {integrity: sha512-CB97UUvDKJde2V0KDWWB3lyf6PC3FaZP7YxZ2G8OAtn9p4HI9j9JLP9qjOGZFvyl8uwNT8qM+hGnz/n16NI7oA==}[m
[32m+[m[32m    engines: {node: '>= 0.4.0'}[m
[32m+[m[32m    dev: false[m
[32m+[m
[32m+[m[32m  /passport/0.6.0:[m
[32m+[m[32m    resolution: {integrity: sha512-0fe+p3ZnrWRW74fe8+SvCyf4a3Pb2/h7gFkQ8yTJpAO50gDzlfjZUZTO1k5Eg9kUct22OxHLqDZoKUWRHOh9ug==}[m
[32m+[m[32m    engines: {node: '>= 0.4.0'}[m
[32m+[m[32m    dependencies:[m
[32m+[m[32m      passport-strategy: 1.0.0[m
[32m+[m[32m      pause: 0.0.1[m
[32m+[m[32m      utils-merge: 1.0.1[m
[32m+[m[32m    dev: false[m
[32m+[m
   /path-exists/4.0.0:[m
     resolution: {integrity: sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==}[m
     engines: {node: '>=8'}[m
[36m@@ -5593,6 +5758,10 @@[m [mpackages:[m
     engines: {node: '>=8'}[m
     dev: true[m
 [m
[32m+[m[32m  /pause/0.0.1:[m
[32m+[m[32m    resolution: {integrity: sha512-KG8UEiEVkR3wGEb4m5yZkVCzigAD+cVEJck2CzYZO37ZGJfctvVptVO192MwrtPhzONn6go8ylnOdMhKqi4nfg==}[m
[32m+[m[32m    dev: false[m
[32m+[m
   /picocolors/1.0.0:[m
     resolution: {integrity: sha512-1fygroTLlHu66zi26VoTDv8yRgm0Fccecssto+MhsZ0D/DGW2sm8E8AjW7NU5VVTRt5GxbeZ5qBuJr+HyLYkjQ==}[m
     dev: true[m
[36m@@ -5963,7 +6132,6 @@[m [mpackages:[m
   /semver/5.7.1:[m
     resolution: {integrity: sha512-sauaDf/PZdVgrLTNYHRtpXa1iRiKcaebiKQ1BJdpQlWH2lCvexQdX55snPFyK7QzpudqbCI0qXFfOasHdyNDGQ==}[m
     hasBin: true[m
[31m-    dev: true[m
 [m
   /semver/6.3.0:[m
     resolution: {integrity: sha512-b39TBaTSfV6yBrapU89p5fKekE2m/NwnDocOVruQFS1/veMgdzuPcnOM34M6CwxW8jH/lxEa5rBoDeUwu5HHTw==}[m
