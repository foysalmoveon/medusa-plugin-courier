import authenticate from '@medusajs/medusa/dist/api/middlewares/authenticate';
import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import getConfigFile from "@medusajs/utils/dist/common/get-config-file";
import cors from 'cors';
import { Router } from 'express';

const bodyParser = require('body-parser')

export default (rootDirectory: string) => {
  const { configModule } = getConfigFile<ConfigModule>(
    rootDirectory,
    "medusa-config"
  )
  const { projectConfig } = configModule
  const router = Router()

  const adminCorsOptions = {
    origin: projectConfig.admin_cors.split(','),
    credentials: true,
  }

  router.use(bodyParser.json())
  router.use(bodyParser.urlencoded({ extended: true }))

  router.options('/admin/steadfast', cors(adminCorsOptions))
  router.post('/admin/steadfast/create_order', cors(adminCorsOptions), authenticate(), async (req, res) => {
    console.log(req.body)
    res.json({
      message: "sucess"
    })
  })
  return router
}
