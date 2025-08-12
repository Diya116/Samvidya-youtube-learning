import {Router} from "express"
import { fetchYouTubeDetails,fetchPlaylistDetail } from "../../src/controller/youtube";
const router:Router=Router();
router.post('/video',fetchYouTubeDetails);
router.post('/playlist',fetchPlaylistDetail);
export default router;