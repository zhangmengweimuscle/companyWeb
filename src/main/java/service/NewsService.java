package service;

import com.github.pagehelper.PageInfo;
import entity.News;
import entity.PageInfoOfFNE;

import java.util.List;

public interface NewsService {
    int insertNews(News news);
    PageInfo<News> selectNews(PageInfoOfFNE pageInfoOfFNE);
    Boolean deleteNews(List<Integer> id);
    Boolean updateNews(News news);
    News selectNewsById(Integer id);
}
