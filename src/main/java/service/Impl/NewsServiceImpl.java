package service.Impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import dao.NewsMapper;
import entity.News;
import entity.NewsExample;
import entity.PageInfoOfFNE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.NewsService;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class NewsServiceImpl implements NewsService {
    @Autowired
    NewsMapper newsMapper;

    @Override
    public int insertNews(News news) {
        String time= LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        news.setDate(time);
        newsMapper.insertSelective(news);
        return 0;
    }

    @Override
    public PageInfo<News> selectNews(PageInfoOfFNE pageInfoOfFNE) {
        int pageNum = pageInfoOfFNE.getPageNum();
        String keyword = "";

        //如果输入值为空，则转换成“”，默认查询所有内容
        if(pageInfoOfFNE.getKeyWords() != null){
            keyword = pageInfoOfFNE.getKeyWords();
        }

        NewsExample example = new NewsExample();
        NewsExample.Criteria criteriaTitle = example.createCriteria();
        NewsExample.Criteria criteriaDate = example.createCriteria();

        criteriaTitle.andTitleLike("%"+keyword+"%");
        criteriaDate.andDateLike("%"+keyword+"%");

        example.or(criteriaDate);

        PageHelper.startPage(pageNum,7);
        PageHelper.orderBy("id desc");

        List<News> list = newsMapper.selectByExampleWithBLOBs(example);
        PageInfo<News> pageInfo = new PageInfo<>(list);
        return pageInfo;
    }

    @Override
    public Boolean deleteNews(List<Integer> id) {
        for (Integer newsid : id){
            newsMapper.deleteByPrimaryKey(newsid);
        }
        return true;
    }

    @Override
    public Boolean updateNews(News news) {
        String time= LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        news.setDate(time);
        newsMapper.updateByPrimaryKeySelective(news);
        return true;
    }

    @Override
    public News selectNewsById(Integer id) {
        News news = newsMapper.selectByPrimaryKey(id);
        return news;
    }
}
