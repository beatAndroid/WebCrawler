 /**  
 *@Description:创建索引demo
 */ 
package com.jikexuyuan.study;  

import java.io.File;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field.Store;
import org.apache.lucene.document.IntField;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.index.IndexWriterConfig.OpenMode;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.util.Version;
  
public class IndexCreate {

	/**  
	 * @param args
	 * @Author:lulei  
	 * @Description:  
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub  
		//指定分词技术，这里使用的是标准分词
		Analyzer analyzer = new StandardAnalyzer(Version.LUCENE_43);
		//indexWriter的配置信息
		IndexWriterConfig indexWriteConfig = new IndexWriterConfig(Version.LUCENE_43, analyzer);
		//索引的打开方式：没有就创建，有就打开
		indexWriteConfig.setOpenMode(OpenMode.CREATE_OR_APPEND);
		Directory directory = null;
		IndexWriter indexWrite = null;
		try {
			//索引在硬盘上的存储路径
			directory = FSDirectory.open(new File("D://index/test"));
			//如果索引处于锁定状态就解锁
			if (IndexWriter.isLocked(directory)) {
				IndexWriter.unlock(directory);
			}
			//指定索引的操作对象为indexWrite
			indexWrite = new IndexWriter(directory, indexWriteConfig);
		} catch (Exception e) {
			// TODO Auto-generated catch block  
			e.printStackTrace();
		}
		
		//文档一
		Document doc1 = new Document();
		//StringField域，当成一个整体，不会被分词
		doc1.add(new StringField("id", "abcde", Store.YES));
		//TextField域，采用指定的分词技术
		doc1.add(new TextField("content", "极客学院", Store.YES));
		//IntField域
		doc1.add(new IntField("num", 1, Store.YES));
		
		try {
			//将文档写入索引中
			indexWrite.addDocument(doc1);
		} catch (Exception e) {
			// TODO Auto-generated catch block  
			e.printStackTrace();
		}
		
		//文档二
		Document doc2 = new Document();
		doc2.add(new StringField("id", "asdff", Store.YES));
		doc2.add(new TextField("content", "Lucene案例开发", Store.YES));
		doc2.add(new IntField("num", 2, Store.YES));
		
		try {
			indexWrite.addDocument(doc2);
		} catch (Exception e) {
			// TODO Auto-generated catch block  
			e.printStackTrace();
		}
		try {
			//将indexWrite操作提交，如果不提交，之前的操作将不会保存到硬盘
			//但是这一步很消耗系统资源，索引执行该操作需要有一定的策略
			indexWrite.commit();
			
			//关闭资源
			indexWrite.close();
			directory.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block  
			e.printStackTrace();
		}
	}

}
