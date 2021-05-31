package service.Impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageInfo;
import dao.CarouselmapMapper;
import entity.Carouselmap;
import entity.CarouselmapExample;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.CarouselmapService;

import java.util.List;


@Service
public class CarouselmapServiceImpl implements CarouselmapService {

    @Autowired
    CarouselmapMapper carouselmapMapper;

    @Override
    public int updateCarouselMapById(Carouselmap carouselmap) {
        carouselmapMapper.updateByPrimaryKeySelective(carouselmap);
        return 0;
    }

    @Override
    public PageInfo<Carouselmap> selectCarouselMap() {
        CarouselmapExample example = new CarouselmapExample();
        CarouselmapExample.Criteria criteria = example.createCriteria();
        criteria.andIdIsNotNull();

        List<Carouselmap> list = carouselmapMapper.selectByExample(example);
        PageInfo<Carouselmap> info = new PageInfo<Carouselmap>(list);

        return info;
    }

}
