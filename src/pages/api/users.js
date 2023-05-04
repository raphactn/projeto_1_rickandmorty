// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import listUsersService from "@/services/listUsersService"

export default function handler(req, res) {

  const users = listUsersService()

  res.status(200).json(users)
}
