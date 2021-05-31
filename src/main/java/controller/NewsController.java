package controller;

import com.github.pagehelper.PageInfo;
import entity.News;
import entity.PageInfoOfFNE;
import org.springframework.web.bind.annotation.*;
import service.NewsService;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/news")
public class NewsController {

    @Resource
    private NewsService newsService;

    //查询新闻（逆序）
    @RequestMapping(value = "/selectNews", method = RequestMethod.POST)
    public @ResponseBody PageInfo<News> selectNews(@RequestBody PageInfoOfFNE pageInfoOfFNE){
        return newsService.selectNews(pageInfoOfFNE);
    }
    //删除新闻
    @RequestMapping(value = "/deleteNews", method = RequestMethod.POST)
    public @ResponseBody Boolean deleteNews(@RequestBody List<Integer> id){
        return newsService.deleteNews(id);
    }
    //添加新闻
    @RequestMapping(value = "/insertNews", method = RequestMethod.POST)
    public @ResponseBody int insertNews(@RequestBody News news){
        return newsService.insertNews(news);
    }
    //新闻跳转
    @RequestMapping(value = "/selectNewsById", method = RequestMethod.POST)
    public @ResponseBody News selectNewsById(@RequestBody News news){
        return newsService.selectNewsById(news.getId());
    }
    //修改新闻
    @RequestMapping(value = "/updateNews", method = RequestMethod.POST)
    public  @ResponseBody Boolean updateNews(@RequestBody News news){
        return newsService.updateNews(news);
    }
}
