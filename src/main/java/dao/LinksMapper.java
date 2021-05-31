package dao;

import java.util.List;

import entity.Links;
import entity.LinksExample;
import org.apache.ibatis.annotations.Param;

public interface LinksMapper {
    int countByExample(LinksExample example);

    int deleteByExample(LinksExample example);

    int deleteByPrimaryKey(int id);

    int insert(Links record);

    int insertSelective(Links record);

    List<Links> selectByExample(LinksExample example);

    Links selectByPrimaryKey(int id);

    int updateByExampleSelective(@Param("record") Links record, @Param("example") LinksExample example);

    int updateByExample(@Param("record") Links record, @Param("example") LinksExample example);

    int updateByPrimaryKeySelective(Links record);

    int updateByPrimaryKey(Links record);
}