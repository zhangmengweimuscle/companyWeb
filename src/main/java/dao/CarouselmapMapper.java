package dao;

import java.util.List;

import entity.Carouselmap;
import entity.CarouselmapExample;
import org.apache.ibatis.annotations.Param;

public interface CarouselmapMapper {
    int countByExample(CarouselmapExample example);

    int deleteByExample(CarouselmapExample example);

    int deleteByPrimaryKey(int id);

    int insert(Carouselmap record);

    int insertSelective(Carouselmap record);

    List<Carouselmap> selectByExample(CarouselmapExample example);

    Carouselmap selectByPrimaryKey(int id);

    int updateByExampleSelective(@Param("record") Carouselmap record, @Param("example") CarouselmapExample example);

    int updateByExample(@Param("record") Carouselmap record, @Param("example") CarouselmapExample example);

    int updateByPrimaryKeySelective(Carouselmap record);

    int updateByPrimaryKey(Carouselmap record);
}