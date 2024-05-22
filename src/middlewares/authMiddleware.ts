import { config } from "dotenv";
import conn from "../config/dbConnection";
import { NextFunction, Request, Response } from "express";
import { StrategyOptionsWithoutRequest, Strategy as jwtStrategy } from "passport-jwt";
import passport from "passport";
import { IUserId, IUserRoleId } from "../interface/IuserId";
import { stringify } from "querystring";
import { IError } from "../interface/IError";

config();

// getToken function for passport
const getToken = (req: Request) => {
  return (
    req.cookies.token ||
    req.body.token ||
    req.header("Authorization")?.replace("Bearer ", "") ||
    null
  );
};

// opts for passport-jwt
let opts = {
  jwtFromRequest: getToken,
  secretOrKey: process.env.JWT_SECRET,
};

// passport-jwt configuration logic
export function passportConfig(passport: passport.PassportStatic) {
  passport.use(
    new jwtStrategy(opts as StrategyOptionsWithoutRequest, async (payload: Record<string, string>, next) => {
      let result: Array<object>
      let id = payload.id;
      try {
        [result] = await conn.query("select u.*,pp.profile_picture from users as u inner join profile_pictures as pp on u.id = pp.user_id where pp.is_active=1 and u.id=?;", [id]) as Array<Array<object>>
      } catch (error) {
        // if any error during query execution
        console.log(error)
        return next(error, false);
      }

      // if user present then call next with payload
      if (result.length > 0) {
        return next(null, result[0]);
      } else {
        // if user not present then call next with empty data
        return next(null, false);
      }
    })
  );
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {

    let id = (req.user as IUserId).id;
    let result: Array<{ role?: String }>
    try {
      [result] = await conn.query(
        "select roles.role as role,users.id,users.fname  from users left join roles on users.role_id=roles.id where users.id=?",
        [id]
      ) as Array<Array<{ role?: String }>>
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        error: (error as IError).message,
      });
    }

    if (result[0].role !== "admin") {
      return res.render('./common/404')
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      error: (error as IError).message,
    });
  }
}

export async function isPatient(req: Request, res: Response, next: NextFunction) {
  try {
    let id = (req.user as IUserId).id;
    let result: Array<{ role?: String }>
    try {
      [result] = await conn.query(
        "select roles.role as role,users.id,users.fname  from users left join roles on users.role_id=roles.id where users.id=?",
        [id]
      ) as Array<Array<{ role?: String }>>
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        error: (error as IError).message,
      });
    }

    if (result[0].role !== "patient") {
      return res.render('./common/404')
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      error: (error as IError).message,
    });
  }
}

export async function isDoctor(req: Request, res: Response, next: NextFunction) {
  try {
    let id = (req.user as IUserId).id;
    let result: Array<{ role?: String }>
    try {
      [result] = await conn.query(
        "select roles.role as role,users.id,users.fname  from users left join roles on users.role_id=roles.id where users.id=?",
        [id]
      ) as Array<Array<{ role?: String }>>
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        error: (error as IError).message,
      });
    }

    if (result[0].role !== "doctor") {
      return res.render('./common/404')
    }

    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      success: false,
      error: (error as IError).message,
    });
  }
}


export async function roleHasPermissions(req: Request, res: Response, next: NextFunction) {
  try {
    let urls: string = req.baseUrl + req.path;
    let url: Array<string> = urls.split("/");
    url.shift();

    let id = url.pop();

    urls = url.join("/");
    if (isNaN(Number(id))) {
      urls += `/${id}`
    }


    let roleId = (req.user as IUserRoleId).role_id;

    let sql = `select * from role_has_permissions as rp inner join permissions p on rp.permission_id = p.id where rp.role_id = ? and p.permission=?`;
    let result;
    try {
      [result] = await conn.query(sql, [roleId, url])
    } catch (error) {
      console.log(error)
    }

    if (String(result).length == 0) {
      return res.render('./common/404')
    }

    next()

  } catch (error) {
    console.log(error)
    return res.json({
      success: false,
      message: (error as IError).message
    })
  }
}