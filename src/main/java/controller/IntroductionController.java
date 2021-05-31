package controller;

import entity.Introduction;
import entity.IntroductionWithBLOBs;
import org.springframework.web.bind.annotation.*;
import service.IntroductionService;

import javax.annotation.Resource;

@RestController
@RequestMapping("/introduction")
public class IntroductionController {
    @Resource
    private IntroductionService introductionService;

    //更新数据库中的信息
    @RequestMapping(value = "/saveIntroduction", method = RequestMethod.POST)
    public @ResponseBody String saveCarouselMap(@RequestBody IntroductionWithBLOBs introductionWithBLOBs){
        introductionService.updateIntroduction(introductionWithBLOBs);
        return "success";
    }
    //从数据库中读取信息
    @RequestMapping(value = "/selectIntroduction", method = RequestMethod.POST)
    public @ResponseBody IntroductionWithBLOBs selectIntroduction(){
        return introductionService.selectIntroduction();
    }
}
