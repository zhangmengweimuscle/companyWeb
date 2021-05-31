package controller;

import com.github.pagehelper.PageInfo;
import entity.Carouselmap;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ObjectNode;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import service.CarouselmapService;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.UUID;

@RestController
@RequestMapping("/carouselMap")
public class CarouselMapController {
    @Resource
    private CarouselmapService carouselmapService;

//添加并显示图片（还没有连接数据库）
    @RequestMapping(value = "/addCarouselMap", method = RequestMethod.POST)
    public @ResponseBody String addCarouselMap(@RequestParam("imgFile") MultipartFile pictureFile, Model model, HttpSession session) throws Exception{
        //图片新名字
        String newName = UUID.randomUUID().toString();
        //图片原名
        String oldName = pictureFile.getOriginalFilename();
        //得到后缀名
        String sux = oldName.substring(oldName.lastIndexOf("."));
        //本地文件流
        File file = new File("G:\\img\\"+newName+sux);
        //写入本地磁盘
        pictureFile.transferTo(file);
        //创建预备返回的json对象
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode node = mapper.createObjectNode();
        //写入数据
        node.put("error",0);
        node.put("message","上传成功！");
        node.put("url","/img/"+newName+sux);
        //准备返回 json格式
        String json = mapper.writeValueAsString(node);
        return  json;
    }
//连接数据库，修改图片
    @RequestMapping(value = "/saveCarouselMap", method = RequestMethod.POST)
    public @ResponseBody String saveCarouselMap(@RequestBody Carouselmap carouselmap){
        int num = carouselmapService.updateCarouselMapById(carouselmap);
        if (num ==0){
            return "success";
        }
        return "error";
    }
//从数据库中读取图片
    @RequestMapping(value = "/selectCarouselMap",method = RequestMethod.POST)
    public @ResponseBody PageInfo<Carouselmap> selectCarouselMap(){
        return carouselmapService.selectCarouselMap();
    }

}
