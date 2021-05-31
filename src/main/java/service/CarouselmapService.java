package service;

import com.github.pagehelper.PageInfo;
import entity.Carouselmap;


public interface CarouselmapService {
    int updateCarouselMapById(Carouselmap carouselmap);
    PageInfo<Carouselmap> selectCarouselMap();
}
