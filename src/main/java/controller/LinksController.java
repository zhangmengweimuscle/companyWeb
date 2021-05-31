package controller;

import com.github.pagehelper.PageInfo;
import entity.Links;
import entity.PageInfoOfFNE;
import org.springframework.web.bind.annotation.*;
import service.LinksService;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/links")
public class LinksController {
    @Resource
    private LinksService linksService;

    //查询链接
    @RequestMapping(value = "/selectLinks", method = RequestMethod.POST)
    public @ResponseBody
    PageInfo<Links> selectLinks(@RequestBody PageInfoOfFNE pageInfoOfFNE){
        return linksService.selectLinks(pageInfoOfFNE);
    }
    //查询所有链接
    @RequestMapping(value = "/selectAllLinks", method = RequestMethod.POST)
    public @ResponseBody PageInfo<Links> selectAllLinks(){
        return linksService.selectAllLinks();
    }
    //删除链接
    @RequestMapping(value = "/deleteLinks", method = RequestMethod.POST)
    public @ResponseBody Boolean deleteLinks(@RequestBody List<Integer> id){
        return linksService.deleteLinks(id);
    }
    //添加链接
    @RequestMapping(value = "/insertLinks", method = RequestMethod.POST)
    public @ResponseBody Boolean insertLinks(@RequestBody Links links){
        return linksService.insertLinks(links);
    }
}
