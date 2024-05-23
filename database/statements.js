class Statements {
  static createUser = `sqlplus
    conn / as sysdba
    show user

    ----
    alter session set "_ORACLE_SCRIPT"  = true

    SET ECHO OFF
    SET VERIFY OFF

    EXECUTE IMMEDIATE ('DROP USER hr CASCADE')

    CREATE USER Prueba IDENTIFIED BY 123

    ALTER USER Prueba DEFAULT TABLESPACE Users
                  QUOTA UNLIMITED ON Users

    ALTER USER Prueba TEMPORARY TABLESPACE temp

    GRANT CREATE SESSION, CREATE VIEW, ALTER SESSION, CREATE SEQUENCE TO Prueba
    GRANT CREATE SYNONYM, CREATE DATABASE LINK, RESOURCE , UNLIMITED TABLESPACE TO Prueba

    REM create Proyecto schema objects

    ALTER SESSION SET CURRENT_SCHEMA=Prueba

    ALTER SESSION SET NLS_LANGUAGE=American
    ALTER SESSION SET NLS_TERRITORY=America`;

  static drop = {
    table: [
      "PROYECTO",
      "EMPLEADO",
      "CLIENTE",
      "PROVEEDOR",
      "EMPRESA_VTA",
      "PERSONA",
      "CIA",
      "PARTIDA",
      "PARTIDA_MEZCLA",
      "PROY_PARTIDA",
      "PROY_PARTIDA_MEZCLA",
      "DPROY_PARTIDA_MEZCLA",
      "ELEMENTOS",
      "TABS",
      "COMP_PAGOCAB",
      "COMP_PAGODET",
      "VTACOMP_PAGOCAB",
      "VTACOMP_PAGODET",
      "FLUJOCAJA",
      "FLUJOCAJA_DET",
    ],
    sequence: [
      "SEC_CIA",
      "SEC_PERSONA",
      "SEC_PROYECTO",
      "SEC_TABS",
      //"--drop sequence SEC_ELEMENTOS",
      "SEC_PARTIDA_E",
      "SEC_PARTIDA_I",
      "SEC_CODPARTIDAS",
      "SEC_PARTIDA_MEZCLA_E",
      "SEC_PARTIDA_MEZCLA_I",
      "SEC_PROY_PARTIDA_MEZCLA_E",
      "SEC_PROY_PARTIDA_MEZCLA_I",
      //"--drop sequence SEC_DPROY_PARTIDA_MEZCLA",
      //"--drop sequence SEC_NRO_CP",
      "SEC_NRO_PAGO_VTA",
      "SEC_DPROY_PARTIDA_MEZCLA_ADELANTO",
      "SEC_DPROY_PARTIDA_MEZCLA_E",
      "SEC_DPROY_PARTIDA_MEZCLA_I",
      "SEC_DPROY_PARTIDA_MEZCLA_PAGO",
      "SEC_DPROY_PARTIDA_MEZCLA_SEMILLA_E",
      "SEC_DPROY_PARTIDA_MEZCLA_SEMILLA_I",
    ],
    procedure: [
      "INSERTAR_CIA ",
      "INSERTAR_CLIENTE ",
      "INSERTAR_EMPLEADO ",
      "INSERTAR_EMPRESA_VTA ",
      "INSERTAR_PROVEEDOR ",
      "INSERTAR_PROYECTO ",
      "INSERTAR_ELEMENTOS ",
      "INSERTAR_TABS ",
      "INSERTAR_PARTIDA ",
      "INSERTAR_PARTIDA_MEZCLA ",
      "INSERTAR_PROY_PARTIDA ",
      "INSERTAR_PROY_PARTIDA_MEZCLA ",
      "INSERTAR_COMP_PAGOCAB ",
      "INSERTAR_COMP_PAGODET ",
      "INSERTAR_VTACOMP_PAGOCAB ",
      "INSERTAR_VTACOMP_PAGODET ",
      "INSERTAR_DPROY_PARTIDA_MEZCLA ",
      "UPDATE_FLUJOCAJA_DET_UNALINEA_Y_GLOBAL",
    ],
    function: ["getPadre ", "DURACIONPROYECTO"],
  };

  static create = {
    table: [
      `CREATE TABLE CIA( 
        CodCIA NUMBER(6) NOT NULL, 
        DesCia VARCHAR2(100) NOT NULL, 
        DesCorta VARCHAR2(20) NOT NULL, 
        Vigente VARCHAR2(1) NOT NULL, 
        CONSTRAINT CIA_PK PRIMARY KEY (CodCIA) 
    ) `,

      `CREATE TABLE PERSONA ( 

        CodCIA NUMBER(6) NOT NULL, 
        CodPersona NUMBER(6) NOT NULL, 
        TipPersona VARCHAR2(1) NOT NULL, 
        DesPersona VARCHAR2(100) NOT NULL, 
        DesCorta VARCHAR2(30) NOT NULL, 
        DescAlterna VARCHAR2(100) NOT NULL, 
        DesCortaAlt VARCHAR2(10) NOT NULL, 
        Vigente VARCHAR2(1) NOT NULL, 

        CONSTRAINT CIA_PERSONA_PK PRIMARY KEY (CodCIA, CodPersona) 

    )`,

      `CREATE TABLE PROVEEDOR ( 

        CodCia NUMBER(6) NOT NULL, 

        CodProveedor NUMBER(6) NOT NULL, 

        NroRuc VARCHAR2(20) NOT NULL, 

        Vigente VARCHAR2(1) NOT NULL, 

        CONSTRAINT PROVEEDOR_PK PRIMARY KEY (CodCia, CodProveedor) 

    ) `,

      `CREATE TABLE CLIENTE ( 

        CodCia NUMBER(6) NOT NULL, 

        CodCliente NUMBER(6) NOT NULL, 

        NroRuc VARCHAR2(20) NOT NULL, 

        Vigente VARCHAR2(1) NOT NULL, 

        CONSTRAINT CLIENTE_PK PRIMARY KEY (CodCia, CodCliente) 

    ) `,

      `CREATE TABLE EMPRESA_VTA ( 

        CodCIA NUMBER(6) NOT NULL, 

        CiaContrata NUMBER(6) NOT NULL, 

        NroRuc VARCHAR2(20) NOT NULL, 

        FlgEmpConsorcio VARCHAR2(1) NOT NULL, 

        FecIni DATE NOT NULL, 

        FecFin DATE NOT NULL, 

        CodEmpresa NUMBER(6) , 

        Observac VARCHAR2(2000) NOT NULL, 

    Vigente VARCHAR2(1) NOT NULL, 

        CONSTRAINT EMPRESA_VTA_PK PRIMARY KEY (CodCIA, CiaContrata) 

    ) `,

      `CREATE TABLE EMPLEADO ( 

        CodCIA NUMBER(6) NOT NULL, 

        CodEmpleado NUMBER(6) NOT NULL, 

        Direcc VARCHAR2(100) NOT NULL, 

        Celular VARCHAR2(33) NOT NULL, 

        Hobby VARCHAR2(2000) NOT NULL, 

        Foto BLOB , 

        FecNac DATE NOT NULL, 

        DNI VARCHAR2(20) NOT NULL, 

        NroCIP VARCHAR2(10) NOT NULL, 

        FecCIPVig DATE NOT NULL, 

        LicCond VARCHAR2(1) NOT NULL, 

        FlgEmplIEA VARCHAR2(1) NOT NULL, 

        Observac VARCHAR2(300) NOT NULL, 

        CodCargo NUMBER(4) NOT NULL, 

        Email VARCHAR2(100) NOT NULL, 

    Vigente VARCHAR2(1) NOT NULL, 

        CONSTRAINT EMPLEADO_PK PRIMARY KEY (CodCIA, CodEmpleado) 

    ) `,

      `CREATE TABLE PROYECTO ( 

        CodCIA NUMBER(6) NOT NULL, 

        CodPyto NUMBER(6) NOT NULL, 

        NombPyto VARCHAR2(1000) NOT NULL, 

        EmplJefeProy NUMBER(6) NOT NULL, 

        CodCia1 NUMBER(6) NOT NULL,  

        CiaContrata NUMBER(6) NOT NULL, 

        CodCC NUMBER(6) NOT NULL, 

        CodCliente NUMBER(6) NOT NULL, 

        FlgEmpConsorcio VARCHAR2(1) NOT NULL, 

        CodSNIP VARCHAR2(10) NOT NULL, 

        FecReg DATE NOT NULL, 

        CodFase NUMBER(1) NOT NULL, 

        CodNivel NUMBER(2) NOT NULL, 

        CodFuncion VARCHAR2(4) NOT NULL, 

        CodSituacion NUMBER(2) NOT NULL, 

        NumInfor NUMBER(1) NOT NULL, 

        NumInforEntrg NUMBER(1) NOT NULL, 

        EstPyto NUMBER(2) NOT NULL, 

        FecEstado DATE NOT NULL, 

        ValRefer NUMBER(12,2) NOT NULL, 

        CostoDirecto NUMBER(12,2) NOT NULL, 

        CostoGGen NUMBER(12,2) NOT NULL, 

        CostoFinan NUMBER(12,2) NOT NULL, 

        ImpUtilidad NUMBER(12,2) NOT NULL, 

        CostoTotSinIGV NUMBER(12,2) NOT NULL, 

        ImpIGV NUMBER(12,2) NOT NULL, 

        CostoTotal NUMBER(12,2) NOT NULL, 

        CostoPenalid NUMBER(12,2) NOT NULL, 

        CodDpto VARCHAR2(2) NOT NULL, 

        CodProv VARCHAR2(2) NOT NULL, 

        CodDist VARCHAR2(2) NOT NULL, 

        FecViab DATE NOT NULL, 

        RutaDoc VARCHAR2(300) NOT NULL, 

        AnnoIni NUMBER(4) NOT NULL, 

        AnnoFin NUMBER(4) NOT NULL, 

        CodObjC NUMBER(2) NOT NULL, 

        LogoProy BLOB , 

        TabEstado VARCHAR2(3) NOT NULL, 

        CodEstado VARCHAR2(3) NOT NULL, 

        Observac VARCHAR2(500) NOT NULL, 

        Vigente VARCHAR2(1) NOT NULL, 

        CONSTRAINT PROYECTO_PK PRIMARY KEY (CodCIA, CodPyto) 

    ) `,

      `CREATE TABLE PARTIDA( 

        CodCia NUMBER(6) NOT NULL, 

        IngEgr VARCHAR2(1) NOT NULL, 

        CodPartida NUMBER(6) NOT NULL, 

        CodPartidas VARCHAR2(12) NOT NULL, 

        DesPartida VARCHAR2(30) NOT NULL, 

        FlgCC VARCHAR2(1) NOT NULL, 

        Nivel NUMBER(2) NOT NULL, 

        TUniMed VARCHAR2(3) NOT NULL, 

        EUniMed VARCHAR2(3) NOT NULL, 

        Semilla NUMBER(5) NOT NULL, 

        Vigente VARCHAR2(1) NOT NULL, 

        CONSTRAINT PARTIDA_PK PRIMARY KEY (CodCia,IngEgr,CodPartida) 

    ) `,

      `CREATE TABLE PARTIDA_MEZCLA( 

        CodCia NUMBER(6) NOT NULL, 

        IngEgr VARCHAR2(1) NOT NULL, 

        CodPartida NUMBER(6) NOT NULL, 

        Corr NUMBER(6) NOT NULL, 

        PadCodPartida NUMBER(6) NOT NULL, 

        TUniMed VARCHAR2(3) NOT NULL, 

        EUniMed VARCHAR2(3) NOT NULL, 

        CostoUnit NUMBER(9,2) NOT NULL, 

        Nivel NUMBER(5) NOT NULL, 

        Orden NUMBER(5) NOT NULL, 

        Vigente VARCHAR2(1) NOT NULL, 

        CONSTRAINT PARTIDA_MEZCLA_PK PRIMARY KEY (CodCia,IngEgr,CodPartida,Corr) 

    ) `,

      `CREATE TABLE PROY_PARTIDA_MEZCLA( 

        CodCia NUMBER(6) NOT NULL, 

        CodPyto NUMBER(6) NOT NULL, 

        IngEgr VARCHAR2(1) NOT NULL, 

        NroVersion NUMBER(1) NOT NULL, 

        CodPartida NUMBER(6) NOT NULL, 

        Corr NUMBER(6) NOT NULL, 

        PadCodPartida NUMBER(6) NOT NULL, --Cambio de VARCHAR A NUMBER(6) 

        TUniMed VARCHAR2(3) NOT NULL, 

        EUniMed VARCHAR2(3) NOT NULL, 

        Nivel NUMBER(5) NOT NULL, 

        Orden NUMBER(5) NOT NULL, 

        CostoUnit NUMBER(9,2) NOT NULL, 

        Cant NUMBER(7,3) NOT NULL, 

        CostoTot NUMBER(10,2) NOT NULL, 

        CONSTRAINT PROY_PARTIDA_MEZCLA_PK PRIMARY KEY (CodCia,CodPyto,NroVersion, 

        IngEgr,CodPartida,Corr) 

    ) `,

      `CREATE TABLE PROY_PARTIDA( 

        CodCia NUMBER(6) NOT NULL, 

        CodPyto NUMBER(6) NOT NULL, 

        NroVersion NUMBER(1) NOT NULL, 

        IngEgr VARCHAR2(1) NOT NULL, 

        CodPartida NUMBER(6) NOT NULL, 

        CodPartidas VARCHAR2(12) NOT NULL, 

        FlgCC VARCHAR2(1) NOT NULL, 

        Nivel NUMBER(2) NOT NULL, 

        UniMed VARCHAR2(5) NOT NULL, 

        TabEstado VARCHAR2(3) NOT NULL, 

        CodEstado VARCHAR2(3) NOT NULL, 

        Vigente VARCHAR2(1) NOT NULL, 

        CONSTRAINT PROY_PARTIDA_PK PRIMARY KEY (CodCia,CodPyto,NroVersion,IngEgr,CodPartida) 

    ) `,

      `CREATE TABLE ELEMENTOS ( 

        CodTab VARCHAR2(3) NOT NULL, 

        CodElem VARCHAR2(3) NOT NULL, 

        DenEle VARCHAR2(50) NOT NULL, 

        DenCorta VARCHAR2(10) NOT NULL, 

        Vigente VARCHAR2(1) NOT NULL, 

        CONSTRAINT ELEMENTOS_PK PRIMARY KEY (CodTab, CodElem) 

    ) `,

      `CREATE TABLE TABS ( 

        CodTab VARCHAR2(3) NOT NULL, 

        DenTab VARCHAR2(50) NOT NULL, 

        DenCorta VARCHAR2(10) NOT NULL, 

        Vigente VARCHAR2(1) NOT NULL, 

        CONSTRAINT TABS_PK PRIMARY KEY (CodTab) 

    ) `,

      `CREATE TABLE DPROY_PARTIDA_MEZCLA ( 

        CodCia NUMBER(6) NOT NULL, 

        CodPyto NUMBER(6) NOT NULL, 

        IngEgr VARCHAR2(1) NOT NULL, 

        NroVersion NUMBER(1) NOT NULL, 

        CodPartida NUMBER(6) NOT NULL, 

        Corr NUMBER(6) NOT NULL, 

        Sec NUMBER(4) NOT NULL, 

        TDesembolso VARCHAR2(3) NOT NULL, 

        EDesembolso VARCHAR2(3) NOT NULL, 

        NroPago NUMBER(2) NOT NULL, 

        TCompPago VARCHAR2(3) NOT NULL, 

        ECompPago VARCHAR2(3) NOT NULL, 

        FecDesembolso DATE NOT NULL, 

        ImpDesembNeto NUMBER(9,2) NOT NULL, 

        ImpDesembIGV NUMBER(8,2) NOT NULL, 

        ImpDesembTot NUMBER(9,2) NOT NULL, 

        Semilla NUMBER(5) NOT NULL, 

        CONSTRAINT DPROY_PARTIDA_MEZCLA_PK PRIMARY KEY (CodCia,CodPyto,IngEgr,NroVersion,CodPartida,Corr,Sec) 

    ) `,

      `CREATE TABLE COMP_PAGOCAB ( 

        CodCIA NUMBER(6) NOT NULL, 

        CodProveedor NUMBER(6) NOT NULL, 

        NroCP VARCHAR2(20) NOT NULL, 

        CodPyto NUMBER(6) NOT NULL, 

        NroPago NUMBER(3) NOT NULL, 

        TCompPago VARCHAR2(3) NOT NULL, 

        ECompPago VARCHAR2(3) NOT NULL, 

        FecCP DATE NOT NULL, 

        TMoneda VARCHAR2(3) NOT NULL, 

        EMoneda VARCHAR2(3) NOT NULL, 

        TipCambio NUMBER(7,4) NOT NULL, 

        ImpMO NUMBER(9,2) NOT NULL, 

        ImpNetoMN NUMBER(9,2) NOT NULL, 

        ImpIGVMN NUMBER(9,2) NOT NULL, 

        ImpTotalMn NUMBER(10,2) NOT NULL, 

        FotoCP VARCHAR2(60) NOT NULL, 

        FotoAbono VARCHAR2(60) NOT NULL, 

        FecAbono DATE NOT NULL, 

        DesAbono VARCHAR2(1000) NOT NULL, 

        Semilla NUMBER(5) NOT NULL, 

        TabEstado VARCHAR2(3) NOT NULL, 

        CodEstado VARCHAR2(3) NOT NULL, 

        CONSTRAINT COMP_PAGOCAB_PK PRIMARY KEY (CodCIA,CodProveedor,NroCP) 

    ) `,

      `CREATE TABLE COMP_PAGODET ( 

        CodCIA NUMBER(6) NOT NULL, 

        CodProveedor NUMBER(6) NOT NULL, 

        NroCP VARCHAR2(20) NOT NULL, 

        Sec NUMBER(4) NOT NULL, 

        IngEgr VARCHAR2(1) NOT NULL, 

        CodPartida NUMBER(6) NOT NULL, 

        ImpNetoMN NUMBER(9,2) NOT NULL, 

        ImpIGVMN NUMBER(9,2) NOT NULL, 

        ImpTotalMn NUMBER(9,2) NOT NULL, 

        Semilla NUMBER(5) NOT NULL, 

        CONSTRAINT COMP_PAGODET_PK PRIMARY KEY (CodCIA,CodProveedor,NroCP,Sec) 

    ) `,

      `CREATE TABLE VTACOMP_PAGOCAB ( 

        CodCIA NUMBER(6) NOT NULL, 

        NroCP VARCHAR2(20) NOT NULL, 

        CodPyto NUMBER(6) NOT NULL, 

        CodCliente NUMBER(6) NOT NULL, 

        NroPago NUMBER(3) NOT NULL, 

        TCompPago VARCHAR2(3) NOT NULL, 

        ECompPago VARCHAR2(3) NOT NULL, 

        FecCP DATE NOT NULL, 

        TMoneda VARCHAR2(3) NOT NULL, 

        EMoneda VARCHAR2(3) NOT NULL, 

        TipCambio NUMBER(7,4) NOT NULL, 

        ImpMO NUMBER(9,2) NOT NULL, 

        ImpNetoMN NUMBER(9,2) NOT NULL, 

        ImpIGVMN NUMBER(9,2) NOT NULL, 

        ImpTotalMN NUMBER(10,2) NOT NULL, 

        FotoCP VARCHAR2(60) NOT NULL, 

        FotoAbono VARCHAR2(60) NOT NULL, 

        FecAbono DATE NOT NULL, 

        DesAbono VARCHAR2(1000) NOT NULL, 

        Semilla NUMBER(5) NOT NULL, 

        TabEstado VARCHAR2(3) NOT NULL, 

        CodEstado VARCHAR2(3) NOT NULL, 

        CONSTRAINT VTACOMP_PAGOCAB_PK PRIMARY KEY (CodCIA,NroCP) 

    ) `,

      `CREATE TABLE VTACOMP_PAGODET ( 

        CodCIA NUMBER(6) NOT NULL, 

        NroCP VARCHAR2(20) NOT NULL, 

        Sec NUMBER(4) NOT NULL, 

        IngEgr VARCHAR2(1) NOT NULL, 

        CodPartida NUMBER(6) NOT NULL, 

        ImpNetoMN NUMBER(9,2) NOT NULL, 

        ImpIGVMN NUMBER(9,2) NOT NULL, 

        ImpTotalMn NUMBER(9,2) NOT NULL, 

        Semilla NUMBER(5) NOT NULL, 

        CONSTRAINT VTACOMP_PAGODET_PK PRIMARY KEY (CodCIA,NroCP,Sec) 

    ) `,

      `CREATE TABLE FLUJOCAJA( 

        CodCia NUMBER(6) NOT NULL, 

        CodPyto NUMBER(6) NOT NULL, 

        IngEgr VARCHAR2(1) NOT NULL, 

        Tipo VARCHAR2(1) NOT NULL, 

        CodPartida NUMBER(6) NOT NULL, 

        Nivel NUMBER(1) NOT NULL, 

        Orden NUMBER(5) NOT NULL, 

        DesConcepto VARCHAR2(30) NOT NULL, 

        DesConceptoCorto VARCHAR2(10) NOT NULL, 

        Semilla NUMBER(5) NOT NULL, 

        Raiz NUMBER(5) NOT NULL, 

        TabEstado VARCHAR2(3) NOT NULL, 

        CodEstado VARCHAR2(3) NOT NULL, 

        Vigente VARCHAR2(1) NOT NULL, 

        CONSTRAINT FLUJOCAJA_PK PRIMARY KEY (CodCia,CodPyto,IngEgr,Tipo,CodPartida) 

    ) `,

      `CREATE TABLE FLUJOCAJA_DET( 

        Anno NUMBER(4) NOT NULL, 

        CodCia NUMBER(6) NOT NULL, 

        CodPyto NUMBER(6) NOT NULL, 

        IngEgr VARCHAR2(1) NOT NULL, 

        Tipo VARCHAR2(1) NOT NULL, 

        CodPartida NUMBER(6) NOT NULL, 

        Orden NUMBER(5)NOT NULL, 

        ImpIni NUMBER(12,2) NOT NULL, 

        ImpRealIni NUMBER(12,2) NOT NULL, 

        ImpEne NUMBER(12,2) NOT NULL, 

        ImpRealEne NUMBER(12,2) NOT NULL, 

        ImpFeb NUMBER(12,2) NOT NULL, 

        ImpRealFeb NUMBER(12,2) NOT NULL, 

        ImpMar NUMBER(12,2) NOT NULL, 

        ImpRealMar NUMBER(12,2) NOT NULL, 

        ImpAbr NUMBER(12,2) NOT NULL, 

        ImpRealAbr NUMBER(12,2) NOT NULL, 

        ImpMay NUMBER(12,2) NOT NULL, 

        ImpRealMay NUMBER(12,2) NOT NULL, 

        ImpJun NUMBER(12,2) NOT NULL, 

        ImpRealJun NUMBER(12,2) NOT NULL, 

        ImpJul NUMBER(12,2) NOT NULL, 

        ImpRealJul NUMBER(12,2) NOT NULL, 

        ImpAgo NUMBER(12,2) NOT NULL, 

        ImpRealAgo NUMBER(12,2) NOT NULL, 

        ImpSep NUMBER(12,2) NOT NULL, 

        ImpRealSep NUMBER(12,2) NOT NULL, 

        ImpOct NUMBER(12,2) NOT NULL, 

        ImpRealOct NUMBER(12,2) NOT NULL, 

        ImpNov NUMBER(12,2) NOT NULL, 

        ImpRealNov NUMBER(12,2) NOT NULL, 

        ImpDic NUMBER(12,2) NOT NULL, 

        ImpRealDic NUMBER(12,2) NOT NULL, 

        ImpAcum NUMBER(12,2) NOT NULL, 

        ImpRealAcum NUMBER(12,2) NOT NULL, 

        CONSTRAINT FLUJOCAJA_DET_PK PRIMARY KEY (Anno,CodCia,CodPyto,IngEgr,Tipo,CodPartida) 

    ) `,
    ],
    foreignKeys: [
      /*==============================================================*/

      /* PERSONA                                                      */

      /*==============================================================*/

      `ALTER TABLE PERSONA ADD CONSTRAINT PERSONA_EMPRESA_VTA_FK 

    FOREIGN KEY (CodCIA) 

    REFERENCES CIA (CodCIA) `,

      /*==============================================================*/

      /* PROVEEDOR                                                    */

      /*==============================================================*/

      `ALTER TABLE PROVEEDOR ADD CONSTRAINT PERSONA_PROVEEDOR_FK 

    FOREIGN KEY (CodCia,CodProveedor) 

    REFERENCES PERSONA (CodCia,CodPersona) `,

      /*==============================================================*/

      /* CLIENTE                                                      */

      /*==============================================================*/

      `ALTER TABLE CLIENTE ADD CONSTRAINT PERSONA_CLIENTE_FK 

    FOREIGN KEY (CodCia,CodCliente) 

    REFERENCES PERSONA (CodCia,CodPersona) `,

      /*==============================================================*/

      /* EMPRESA_VTA                                                  */

      /*==============================================================*/

      `ALTER TABLE EMPRESA_VTA ADD CONSTRAINT PERSONA_EMPRESA_VTA_CIA_FK 

    FOREIGN KEY (CodCIA, CiaContrata) 

    REFERENCES PERSONA (CodCIA, CodPersona) `,

      /*==============================================================*/

      /* EMPLEADO                                                     */

      /*==============================================================*/

      `ALTER TABLE EMPLEADO ADD CONSTRAINT PERSONA_EMPLEADO_FK 

    FOREIGN KEY (CodCIA,CodEmpleado) 

    REFERENCES PERSONA (CodCIA,CodPersona) `,

      /*==============================================================*/

      /* PROYECTO                                                     */

      /*==============================================================*/

      `ALTER TABLE PROYECTO ADD CONSTRAINT CIA_PROYECTO_FK 

    FOREIGN KEY (CodCIA) 

    REFERENCES CIA (CodCIA) `,

      `ALTER TABLE PROYECTO ADD CONSTRAINT EMPLEADO_PROYECTO_FK 

    FOREIGN KEY (CodCIA, EmplJefeProy) 

    REFERENCES EMPLEADO (CodCIA, CodEmpleado) `,

      `ALTER TABLE PROYECTO ADD CONSTRAINT CLIENTE_PROYECTO_FK 

    FOREIGN KEY (CodCIA, CodCliente) 

    REFERENCES CLIENTE (CodCIA, CodCliente) `,

      `ALTER TABLE PROYECTO ADD CONSTRAINT EMPRESA_VTA_PROYECTO_FK 

    FOREIGN KEY (CodCIA, CiaContrata) 

    REFERENCES EMPRESA_VTA (CodCIA, CiaContrata) `,

      /*==============================================================*/

      /* PARTIDA                                                      */

      /*==============================================================*/

      `ALTER TABLE PARTIDA ADD CONSTRAINT CIA_PARTIDAFK 

    FOREIGN KEY (CodCia) 

    REFERENCES CIA (CodCia) `,

      /*==============================================================*/

      /* PROY_PARTIDA                                                 */

      /*==============================================================*/

      `ALTER TABLE PROY_PARTIDA ADD CONSTRAINT PROYECTO_PROY_PARTIDA_FK 

    FOREIGN KEY (CodCia,CodPyto) 

    REFERENCES PROYECTO(CodCia,CODPYTO) `,

      `ALTER TABLE PROY_PARTIDA ADD CONSTRAINT PARTIDA_PROY_PARTIDA_FK 

    FOREIGN KEY (CodCia,IngEgr,CodPartida) 

    REFERENCES PARTIDA (CodCia,IngEgr,CodPartida) `,

      /*ALTER TABLE PROY_PARTIDA ADD CONSTRAINT ESTADO_PROY_PARTIDA_FK 

    FOREIGN KEY (TabEstado,CodEstado) 

    REFERENCES ESTADO (TabEstado,CodEstado)*/

      /*==============================================================*/

      /* PARTIDA_MEZCLA                                               */

      /*==============================================================*/

      `ALTER TABLE PARTIDA_MEZCLA ADD CONSTRAINT PARTIDA_PARTIDA_MEZCLA_FK 

    FOREIGN KEY (CodCia,IngEgr,CodPartida) 

    REFERENCES PARTIDA (CodCia,IngEgr,CodPartida) `,

      `ALTER TABLE PARTIDA_MEZCLA ADD CONSTRAINT ELEMENTOS_PARTIDA_MEZCLA_FK 

    FOREIGN KEY (TUniMed,EUniMed) 

    REFERENCES ELEMENTOS (CodTab,CodElem) `,

      /*==============================================================*/

      /* PROY_PARTIDA_MEZCLA                                          */

      /*==============================================================*/

      `ALTER TABLE PROY_PARTIDA_MEZCLA ADD CONSTRAINT PROY_PARTIDA_PROY_PARTIDA_MEZCLA_FK 

    FOREIGN KEY (CodCia,CodPyto,NroVersion,IngEgr,CodPartida) 

    REFERENCES PROY_PARTIDA (CodCia,CodPyto,NroVersion,IngEgr,CodPartida) `,

      `ALTER TABLE PROY_PARTIDA_MEZCLA ADD CONSTRAINT ELEMENTOS_PROY_PARTIDA_MEZCLA_FK 

    FOREIGN KEY (TUniMed,EUniMed) 

    REFERENCES ELEMENTOS (CodTab,CodElem) `,

      /*==============================================================*/

      /* DPROY_PARTIDA_MEZCLA                                          */

      /*==============================================================*/

      `ALTER TABLE DPROY_PARTIDA_MEZCLA ADD CONSTRAINT PROY_PARTIDA_MEZCLA_DPROY_PARTIDA_MEZCLA_FK 

    FOREIGN KEY (CodCia, CodPyto, IngEgr, NroVersion, CodPartida, Corr) 

    REFERENCES PROY_PARTIDA_MEZCLA (CodCia, CodPyto, IngEgr, NroVersion, CodPartida, Corr) `,

      `ALTER TABLE DPROY_PARTIDA_MEZCLA ADD CONSTRAINT ELEMENTOS_DPROY_PARTIDA_MEZCLA_Desembolso_FK 

    FOREIGN KEY (TDesembolso, EDesembolso) 

    REFERENCES ELEMENTOS (CodTab,CodElem) `,

      `ALTER TABLE DPROY_PARTIDA_MEZCLA ADD CONSTRAINT ELEMENTOS_DPROY_PARTIDA_MEZCLA_Comprobante_FK 

    FOREIGN KEY (TCompPago, ECompPago) 

    REFERENCES ELEMENTOS (CodTab,CodElem) `,

      /*==============================================================*/

      /* ELEMENTOS                                                    */

      /*==============================================================*/

      `ALTER TABLE ELEMENTOS ADD CONSTRAINT ELEMENTOS_TABS_FK 

    FOREIGN KEY (CodTab) 

    REFERENCES TABS (CodTab) `,

      /*==============================================================*/

      /* TABS                                                         */

      /*==============================================================*/

      /*NO TIENE*/

      /*==============================================================*/

      /* COMP_PAGOCAB                                                 */

      /*==============================================================*/

      `ALTER TABLE COMP_PAGOCAB ADD CONSTRAINT COMP_PAGOCAB_PROVEEDOR_FK 

      FOREIGN KEY (CodCIA,CodProveedor) 

      REFERENCES PROVEEDOR (CodCIA,CodProveedor) `,

      `ALTER TABLE COMP_PAGOCAB ADD CONSTRAINT COMP_PAGOCAB_ELEMENTOS_FK 

    FOREIGN KEY (TMoneda,EMoneda) 

    REFERENCES ELEMENTOS (CodTab,CodElem) `,

      `ALTER TABLE COMP_PAGOCAB ADD CONSTRAINT COMP_PAGOCAB_ELEMENTOS_2_FK 

    FOREIGN KEY (TCompPago,ECompPago) 

    REFERENCES ELEMENTOS (CodTab,CodElem) `,

      `ALTER TABLE COMP_PAGOCAB ADD CONSTRAINT COMP_PAGOCAB_PROYECTO_FK 

    FOREIGN KEY (CodCIA,CodPyto) 

    REFERENCES PROYECTO (CodCIA,CodPyto) `,

      /* FALTA LLAVE FORANEA DE ESTADOS (TABLA INEXISTENTE)*/

      /*==============================================================*/

      /* COMP_PAGODET                                                 */

      /*==============================================================*/

      `ALTER TABLE COMP_PAGODET ADD CONSTRAINT COMP_PAGODET_COMP_PAGOCAB_FK 

    FOREIGN KEY (CodCIA,CodProveedor,NroCP) 

    REFERENCES COMP_PAGOCAB (CodCIA,CodProveedor,NroCP) `,

      `ALTER TABLE COMP_PAGODET ADD CONSTRAINT COMP_PAGODET_PARTIDA_FK 

    FOREIGN KEY (CodCIA,IngEgr,CodPartida) 

    REFERENCES PARTIDA (CodCIA,IngEgr,CodPartida) `,

      /*==============================================================*/

      /* VTACOMP_PAGOCAB                                              */

      /*==============================================================*/

      `ALTER TABLE VTACOMP_PAGOCAB ADD CONSTRAINT VTACOMP_PAGOCAB_CLIENTE_FK 

    FOREIGN KEY (CodCIA,CodCliente) REFERENCES CLIENTE (CodCIA,CodCliente) `,

      `ALTER TABLE VTACOMP_PAGOCAB ADD CONSTRAINT VTACOMP_PAGOCAB_ELEMENTOS_FK 

    FOREIGN KEY (TMoneda,EMoneda) 

    REFERENCES ELEMENTOS (CodTab,CodElem) `,

      `ALTER TABLE VTACOMP_PAGOCAB ADD CONSTRAINT VTACOMP_PAGOCAB_ELEMENTOS_2_FK 

    FOREIGN KEY (TCompPago,ECompPago) 

    REFERENCES ELEMENTOS (CodTab,CodElem) `,

      `ALTER TABLE VTACOMP_PAGOCAB ADD CONSTRAINT VTACOMP_PAGOCAB_PROYECTO_FK 

    FOREIGN KEY (CodCIA,CodPyto) 

    REFERENCES PROYECTO (CodCIA,CodPyto) `,

      /* FALTA LLAVE FORANEA DE ESTADOS (TABLA INEXISTENTE)*/

      /*==============================================================*/

      /* VTACOMP_PAGODET                                              */

      /*==============================================================*/

      `ALTER TABLE VTACOMP_PAGODET ADD CONSTRAINT VTACOMP_PAGODET_VTACOMP_PAGOCAB_FK 

    FOREIGN KEY (CodCIA,NroCP) 

    REFERENCES VTACOMP_PAGOCAB (CodCIA,NroCP) `,

      `ALTER TABLE VTACOMP_PAGODET ADD CONSTRAINT VTACOMP_PAGODET_PARTIDA_FK 

    FOREIGN KEY (CodCIA,IngEgr,CodPartida) 

    REFERENCES PARTIDA (CodCIA,IngEgr,CodPartida) `,

      /*==============================================================*/

      /* FLUJOCAJA                                           */

      /*==============================================================*/

      `ALTER TABLE FLUJOCAJA ADD CONSTRAINT PARTIDA_FLUJOCAJA_FK 

    FOREIGN KEY (CodCia,IngEgr,CodPartida) 

    REFERENCES PARTIDA (CodCia,IngEgr,CodPartida) `,

      `ALTER TABLE FLUJOCAJA ADD CONSTRAINT PROYECTO_FLUJOCAJA_FK 

    FOREIGN KEY (CodCia,CodPyto) 

    REFERENCES PROYECTO (CodCia,CodPyto) `,

      /*ALTER TABLE FLUJOCAJA ADD CONSTRAINT ESTADO_FLUJOCAJA_FK 

    FOREIGN KEY (TabEstado,CodEstado) 

    REFERENCES ESTADO (TabEstado,CodEstado)*/

      /*==============================================================*/

      /* FLUJOCAJA_DET                                          */

      /*==============================================================*/ `ALTER TABLE FLUJOCAJA_DET ADD CONSTRAINT FLUJOCAJA_FLUJOCAJA_DET_FK 

    FOREIGN KEY (CodCia,CodPyto,IngEgr,Tipo,CodPartida) 

    REFERENCES FLUJOCAJA(CodCia,CodPyto,IngEgr,Tipo,CodPartida)`,
    ],
    sequence: [
      `create sequence SEC_CIA 
        start with 1 
        increment by 1 
        maxvalue 99999 
        minvalue 1`,
      `create sequence SEC_PERSONA 
        start with 1 
        increment by 1 
        maxvalue 99999 
        minvalue 1`,
      `create sequence SEC_PROYECTO 
        start with 1 
        increment by 1 
        maxvalue 99999 
        minvalue 1`,
      `create sequence SEC_TABS 
        start with 5 
        increment by 1 
        maxvalue 99999 
        minvalue 1`,
      /*NO VA */
      /*create sequence SEC_ELEMENTOS 

  start with 1 

  increment by 1 

  maxvalue 99999 

  minvalue 1,*/

      `create sequence SEC_PARTIDA_E 
        start with 1        
        increment by 1        
        maxvalue 99999        
        minvalue 1`,
      `create sequence SEC_PARTIDA_I         
        start with 1        
        increment by 1        
        maxvalue 99999        
        minvalue 1`,
      `create sequence SEC_CODPARTIDAS         
        start with 10000000         
        increment by 1        
        maxvalue 99999999         
        minvalue 1000000`,
      `create sequence SEC_PARTIDA_MEZCLA_E         
        start with 1        
        increment by 1        
        maxvalue 99999        
        minvalue 1`,
      `create sequence SEC_PARTIDA_MEZCLA_I 
        start with 1        
        increment by 1        
        maxvalue 99999        
        minvalue 1`,
      `create sequence SEC_PROY_PARTIDA_MEZCLA_E 
        start with 1        
        increment by 1        
        maxvalue 99999        
        minvalue 1`,
      `create sequence SEC_PROY_PARTIDA_MEZCLA_I 
        start with 1        
        increment by 1        
        maxvalue 99999        
        minvalue 1`,
      `create sequence SEC_DPROY_PARTIDA_MEZCLA_E         
        start with 1        
        increment by 1        
        maxvalue 99999        
        minvalue 1`,
      `create sequence SEC_DPROY_PARTIDA_MEZCLA_I         
        start with 1        
        increment by 1        
        maxvalue 99999        
        minvalue 1`,
      `create sequence SEC_DPROY_PARTIDA_MEZCLA_PAGO        
        start with 1        
        increment by 1        
        maxvalue 99999        
        minvalue 1`,
      `create sequence SEC_DPROY_PARTIDA_MEZCLA_ADELANTO        
        start with 1        
        increment by 1        
        maxvalue 99999        
        minvalue 1`,
      `create sequence SEC_DPROY_PARTIDA_MEZCLA_SEMILLA_I 
        start with 1        
        increment by 1        
        maxvalue 99999        
        minvalue 1`,
      `create sequence SEC_DPROY_PARTIDA_MEZCLA_SEMILLA_E 
        start with 1        
        increment by 1        
        maxvalue 99999        
        minvalue 1`,

      /*`create sequence SEC_NRO_CP 

  start with 1 

  increment by 1 

  maxvalue 99999 

  minvalue 1`,*/

      `create sequence SEC_NRO_PAGO_VTA 
        start with 1        
        increment by 1        
        maxvalue 99999        
        minvalue 1`,
    ],
    trigger: [
      `
CREATE OR REPLACE TRIGGER INSERTAR_FLUJOCAJA_CABECERA 
BEFORE INSERT ON PROY_PARTIDA_MEZCLA 
FOR EACH ROW 
DECLARE 
  annoAuxiliar NUMBER(10);
  numeroDeColumnas NUMBER(10);
  CURSOR CURSOR_ANNOS IS 
    SELECT n 
    FROM (
      SELECT DISTINCT ROWNUM n 
      FROM dual 
      CONNECT BY LEVEL <= (SELECT ANNOFIN FROM PROYECTO WHERE CODPYTO = :new.CODPYTO)
    ) 
    WHERE n >= (SELECT ANNOINI FROM PROYECTO WHERE CODPYTO = :new.CODPYTO) 
    ORDER BY n;
BEGIN 
  SELECT COUNT(n) 
  INTO numeroDeColumnas 
  FROM (
    SELECT DISTINCT ROWNUM n 
    FROM dual 
    CONNECT BY LEVEL <= (SELECT ANNOFIN FROM PROYECTO WHERE CODPYTO = :new.CODPYTO)
  ) 
  WHERE n >= (SELECT ANNOINI FROM PROYECTO WHERE CODPYTO = :new.CODPYTO); 

  INSERT INTO FLUJOCAJA 
  VALUES (
    :new.CODCIA, :new.CODPYTO, :new.INGEGR, '-', :new.CODPARTIDA, 
    :new.NIVEL, :new.ORDEN, 'DESCONCEPTO', 'D_CORTO', 0, 0, '-1', '1', '1'
  );

  OPEN CURSOR_ANNOS;
  LOOP 
    FETCH CURSOR_ANNOS INTO annoAuxiliar;
    EXIT WHEN CURSOR_ANNOS%NOTFOUND;

    INSERT INTO FLUJOCAJA_DET 
    VALUES (
      annoAuxiliar, :new.CODCIA, :new.CODPYTO, :new.INGEGR, '-', :new.CODPARTIDA, 
      :new.ORDEN, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    );

    numeroDeColumnas := numeroDeColumnas - 1;
    EXIT WHEN numeroDeColumnas = 0;
  END LOOP;
  CLOSE CURSOR_ANNOS;
END;`,
    ],
    function: [
      `
      create or replace FUNCTION getPadre 
        (NROHIJO IN FLUJOCAJA.CODCIA%TYPE, ING_EGR IN FLUJOCAJA.INGEGR%TYPE, COD_PYTO IN PROYECTO.CODPYTO%TYPE) 
          return NUMBER 

        IS 
          NROPADRE NUMBER 
        BEGIN 
          SELECT PADCODPARTIDA INTO NROPADRE FROM PROY_PARTIDA_MEZCLA WHERE CODPARTIDA = NROHIJO AND INGEGR=ING_EGR AND CODPYTO = COD_PYTO 
        RETURN NROPADRE 
      END getPadre `,
      `
      create or replace FUNCTION duracionProyecto 
        (COD_PYTO IN PROYECTO.CODPYTO%TYPE) 
          return NUMBER 
        IS 
          duracionEnAnios NUMBER 
      BEGIN 
          select count(n) into duracionEnAnios from (select distinct rownum n from dual connect by level <= (SELECT ANNOFIN FROM PROYECTO WHERE CODPYTO=COD_PYTO)) where n >= (SELECT ANNOINI FROM PROYECTO WHERE CODPYTO=COD_PYTO) ORDER BY n; 
      RETURN duracionEnAnios; 
      END duracionProyecto;       
      `,
    ],
    procedure: [
      `
/*INSERTAR UPDATE_FLUJOCAJA_DET_UNALINEA_Y_GLOBAL*/ 

 

CREATE OR REPLACE PROCEDURE UPDATE_FLUJOCAJA_DET_UNALINEA_Y_GLOBAL 

    (COD_CIA IN FLUJOCAJA.CODCIA%TYPE,  

    COD_PYTO IN FLUJOCAJA.CODPYTO%TYPE,  

    ING_EGR IN FLUJOCAJA.INGEGR%TYPE,  

    COD_PARTIDA IN FLUJOCAJA.CODPARTIDA%TYPE, 

    COSTO_TOTAL IN COMP_PAGOCAB.IMPTOTALMN%TYPE, 

    FECHA IN VTACOMP_PAGOCAB.FECCP%TYPE, 

    PROYECTADO_REAL IN CLIENTE.VIGENTE%TYPE) 

    IS 

    contador number(20); 

    nroDeMes     number(2); 

    nroDeAnio    number(4); 

    valorAuxiliarActual number(10); 

    valorAuxiliarPadre number(10); 

    codHijo number(10); 

    BEGIN 

    nroDeMes :=  to_char(FECHA,'MM') ; 

    nroDeAnio :=  to_char(FECHA,'YYYY') ; 

     

    IF(PROYECTADO_REAL = 'P') THEN 

        IF(nroDeMes=1)THEN 

            SELECT IMPENE INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPENE=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPENE INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPENE=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPACUM = IMPINI+IMPENE+IMPFEB+IMPMAR+IMPABR+IMPMAY+IMPJUN+IMPJUL+IMPAGO+IMPSEP+IMPOCT+IMPNOV+IMPDIC; 

                UPDATE FLUJOCAJA_DET F1 SET F1.IMPINI =  

                NVL((SELECT F2.IMPACUM FROM FLUJOCAJA_DET F2 WHERE F2.ANNO=(F1.ANNO-1) AND F2.CODPARTIDA=F1.CODPARTIDA AND F2.INGEGR=F1.INGEGR AND F2.CODPYTO=F1.CODPYTO AND F2.CODCIA=F1.CODCIA),0);  

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=2)THEN 

            SELECT IMPFEB INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPFEB=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPFEB INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPFEB=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=3)THEN 

            SELECT IMPMAR INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPMAR=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPMAR INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPMAR=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=4)THEN 

            SELECT IMPABR INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPABR=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPABR INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPABR=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=5)THEN 

            SELECT IMPMAY INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPMAY=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPMAY INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPMAY=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=6)THEN 

            SELECT IMPJUN INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPJUN=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPJUN INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPJUN=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=7)THEN 

            SELECT IMPJUL INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPJUL=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPJUL INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPJUL=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=8)THEN 

            SELECT IMPAGO INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPAGO=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPAGO INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPAGO=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=9)THEN 

            SELECT IMPSEP INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPSEP=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPSEP INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPSEP=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=10)THEN 

            SELECT IMPOCT INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPOCT=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPOCT INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPOCT=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=11)THEN 

            SELECT IMPNOV INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPNOV=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPNOV INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPNOV=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=12)THEN 

            SELECT IMPDIC INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPDIC=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPDIC INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPDIC=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        END IF; 

    END IF; 

 

    IF(PROYECTADO_REAL = 'R') THEN 

        IF(nroDeMes=1)THEN 

            SELECT IMPREALENE INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPREALENE=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPREALENE INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPREALENE=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=2)THEN 

            SELECT IMPREALFEB INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPREALFEB=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPREALFEB INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPREALFEB=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=3)THEN 

            SELECT IMPREALMAR INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPREALMAR=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPREALMAR INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPREALMAR=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=4)THEN 

            SELECT IMPREALABR INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPREALABR=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPREALABR INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPREALABR=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=5)THEN 

            SELECT IMPREALMAY INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPREALMAY=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPREALMAY INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPREALMAY=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=6)THEN 

            SELECT IMPREALJUN INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPREALJUN=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPREALJUN INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPREALJUN=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=7)THEN 

            SELECT IMPREALJUL INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPREALJUL=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPREALJUL INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPREALJUL=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=8)THEN 

            SELECT IMPREALAGO INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPREALAGO=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPREALAGO INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPREALAGO=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=9)THEN 

            SELECT IMPREALSEP INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPREALSEP=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPREALSEP INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPREALSEP=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=10)THEN 

            SELECT IMPREALOCT INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPREALOCT=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPREALOCT INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPREALOCT=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=11)THEN 

            SELECT IMPREALNOV INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPREALNOV=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPREALNOV INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPREALNOV=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        ELSIF(nroDeMes=12)THEN 

            SELECT IMPREALDIC INTO valorAuxiliarActual FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            UPDATE FLUJOCAJA_DET SET IMPREALDIC=valorAuxiliarActual+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=COD_PARTIDA AND ANNO=nroDeAnio; 

            codHijo:=COD_PARTIDA; 

            WHILE (getPadre(codHijo,ING_EGR,COD_PYTO)<>0) 

            LOOP 

                SELECT IMPREALDIC INTO valorAuxiliarPadre FROM FLUJOCAJA_DET WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                UPDATE FLUJOCAJA_DET SET IMPREALDIC=valorAuxiliarPadre+COSTO_TOTAL WHERE CODCIA=COD_CIA AND CODPYTO=COD_PYTO AND INGEGR=ING_EGR AND CODPARTIDA=getPadre(codHijo,ING_EGR,COD_PYTO) AND ANNO=nroDeAnio; 

                codHijo:=getPadre(codHijo,ING_EGR,COD_PYTO); 

            END LOOP; 

        END IF; 

    END IF; 

     

    --UPDATE FLUJOCAJA_DET SET IMPACUM = IMPINI+IMPENE+IMPFEB+IMPMAR+IMPABR+IMPMAY+IMPJUN+IMPJUL+IMPAGO+IMPSEP+IMPOCT+IMPNOV+IMPDIC; 

    --UPDATE FLUJOCAJA_DET SET IMPREALACUM = IMPREALINI+IMPREALENE+IMPREALFEB+IMPREALMAR+IMPREALABR+IMPREALMAY+IMPREALJUN+IMPREALJUL+IMPREALAGO+IMPREALSEP+IMPREALOCT+IMPREALNOV+IMPREALDIC; 

     

    contador:=duracionProyecto(COD_PYTO); 

    WHILE (contador>0) 

            LOOP 

                contador:=contador-1; 

                UPDATE FLUJOCAJA_DET F1 SET F1.IMPINI =  

                NVL((SELECT F2.IMPACUM FROM FLUJOCAJA_DET F2 WHERE F2.ANNO=(F1.ANNO-1) AND F2.CODPARTIDA=F1.CODPARTIDA AND F2.INGEGR=F1.INGEGR AND F2.CODPYTO=F1.CODPYTO AND F2.CODCIA=F1.CODCIA),0);  

                 

                UPDATE FLUJOCAJA_DET F1 SET F1.IMPREALINI =  

                NVL((SELECT F2.IMPREALACUM FROM FLUJOCAJA_DET F2 WHERE F2.ANNO=(F1.ANNO-1) AND F2.CODPARTIDA=F1.CODPARTIDA AND F2.INGEGR=F1.INGEGR AND F2.CODPYTO=F1.CODPYTO AND F2.CODCIA=F1.CODCIA),0);  

     

                UPDATE FLUJOCAJA_DET SET IMPACUM = IMPINI+IMPENE+IMPFEB+IMPMAR+IMPABR+IMPMAY+IMPJUN+IMPJUL+IMPAGO+IMPSEP+IMPOCT+IMPNOV+IMPDIC; 

                UPDATE FLUJOCAJA_DET SET IMPREALACUM = IMPREALINI+IMPREALENE+IMPREALFEB+IMPREALMAR+IMPREALABR+IMPREALMAY+IMPREALJUN+IMPREALJUL+IMPREALAGO+IMPREALSEP+IMPREALOCT+IMPREALNOV+IMPREALDIC; 

    END LOOP; 

     

END UPDATE_FLUJOCAJA_DET_UNALINEA_Y_GLOBAL;
`,

      `
/*INSERTAR EMPRESA*/ 

 

create or replace PROCEDURE INSERTAR_EMPRESA_VTA( 

    CODCIA IN PERSONA.CODCIA%TYPE, 

    DESP IN PERSONA.DESPERSONA%TYPE, 

    DESCOR IN PERSONA.DESCORTA%TYPE, 

    DESCALT IN PERSONA.DESCALTERNA%TYPE, 

    DESCORALT IN PERSONA.DESCORTAALT%TYPE, 

    VIG IN PERSONA.VIGENTE%TYPE, 

    RUC IN EMPRESA_VTA.NRORUC%TYPE, 

    CONSORCIO IN EMPRESA_VTA.FLGEMPCONSORCIO%TYPE, 

    INI IN EMPRESA_VTA.FECINI%TYPE, 

    FIN IN EMPRESA_VTA.FECFIN%TYPE, 

    OBS IN EMPRESA_VTA.OBSERVAC%TYPE) 

IS 

BEGIN 

 INSERT INTO PERSONA VALUES(CODCIA,SEC_PERSONA.NEXTVAL,'2',DESP,DESCOR,DESCALT,DESCORALT,VIG); 

 INSERT INTO EMPRESA_VTA VALUES(CODCIA,SEC_PERSONA.CURRVAL,RUC,CONSORCIO,INI,FIN,NULL,OBS,VIG); 

END; 
`,
      `
/*INSERTAR EMPLEADO*/ 

 

create or replace PROCEDURE INSERTAR_EMPLEADO( 

    CIA IN PERSONA.CODCIA%TYPE, 

    TIP IN PERSONA.TIPPERSONA%TYPE, 

    DESP IN PERSONA.DESPERSONA%TYPE, 

    DESCOR IN PERSONA.DESCORTA%TYPE, 

    DESCALT IN PERSONA.DESCALTERNA%TYPE, 

    DESCORALT IN PERSONA.DESCORTAALT%TYPE, 

    VIG IN PERSONA.VIGENTE%TYPE, 

    DIR IN EMPLEADO.DIRECC%TYPE, 

    CEL IN EMPLEADO.CELULAR%TYPE, 

    HOB IN EMPLEADO.HOBBY%TYPE, 

    FOT IN EMPLEADO.FOTO%TYPE, 

    NAC IN EMPLEADO.FECNAC%TYPE, 

    IDEN IN EMPLEADO.DNI%TYPE, 

    CIP IN EMPLEADO.NROCIP%TYPE, 

    CIPVIG IN EMPLEADO.FECCIPVIG%TYPE, 

    COND IN EMPLEADO.LICCOND%TYPE, 

    FLG IN EMPLEADO.FLGEMPLIEA%TYPE, 

    OBS IN EMPLEADO.OBSERVAC%TYPE, 

    CODCAR IN EMPLEADO.CODCARGO%TYPE, 

    CORREO IN EMPLEADO.EMAIL%TYPE) 

IS 

BEGIN 

 INSERT INTO PERSONA VALUES(CIA,SEC_PERSONA.NEXTVAL,TIP,DESP,DESCOR,DESCALT,DESCORALT,VIG); 

 INSERT INTO EMPLEADO VALUES(CIA,SEC_PERSONA.CURRVAL,DIR,CEL,HOB,FOT,NAC,IDEN,CIP,CIPVIG,COND,FLG,OBS,CODCAR,CORREO,VIG); 

END; 
`,

      `
/*INSERTAR PROVEEDOR*/ 

 

create or replace PROCEDURE INSERTAR_PROVEEDOR( 

    CODC IN PERSONA.CODCIA%TYPE, 

    TIP IN PERSONA.TIPPERSONA%TYPE, 

    DESP IN PERSONA.DESPERSONA%TYPE, 

    DESCOR IN PERSONA.DESCORTA%TYPE, 

    DESCALT IN PERSONA.DESCALTERNA%TYPE, 

    DESCORALT IN PERSONA.DESCORTAALT%TYPE, 

    VIG IN PERSONA.VIGENTE%TYPE, 

    RUC IN PROVEEDOR.NRORUC%TYPE) 

IS 

BEGIN 

 INSERT INTO PERSONA VALUES(CODC,SEC_PERSONA.NEXTVAL,TIP,DESP,DESCOR,DESCALT,DESCORALT,VIG); 

 INSERT INTO PROVEEDOR VALUES(CODC,SEC_PERSONA.CURRVAL,RUC,VIG); 

END; 

/ 

 

/*INSERTAR CIA*/ 

create or replace PROCEDURE INSERTAR_CIA( 

    CODC IN CIA.CODCIA%TYPE, 

    DES IN CIA.DESCIA%TYPE, 

    DESCORTA IN CIA.DESCORTA%TYPE, 

    VIG IN CIA.VIGENTE%TYPE) 

IS 

BEGIN 

 INSERT INTO CIA VALUES(SEC_CIA.NEXTVAL,DES,DESCORTA,VIG); 

END; 
`,

      `
/*INSERTAR PROYECTO*/ 

 

create or replace PROCEDURE INSERTAR_PROYECTO( 

    COD_CIA IN PROYECTO.CODCIA%TYPE, 

    NOMPY IN PROYECTO.NOMBPYTO%TYPE, 

    JEFE IN PROYECTO.EMPLJEFEPROY%TYPE, 

    CIACONT IN PROYECTO.CIACONTRATA%TYPE, 

    CODCLI IN PROYECTO.CODCLIENTE%TYPE, 

    FECRE IN PROYECTO.FECREG%TYPE, 

    ESTPYT IN PROYECTO.ESTPYTO%TYPE, 

    FECEST IN PROYECTO.FECESTADO%TYPE, 

    VALREF IN PROYECTO.VALREFER%TYPE, 

    COSTOTOTSIN IN PROYECTO.COSTOTOTSINIGV%TYPE, 

    IGV IN PROYECTO.IMPIGV%TYPE, 

    COSTOT IN PROYECTO.COSTOTOTAL%TYPE, 

    OBS IN PROYECTO.OBSERVAC%TYPE, 

    ANNOIN IN PROYECTO.ANNOINI%TYPE, 

    ANNOFI IN PROYECTO.ANNOFIN%TYPE, 

    LOGO IN PROYECTO.LOGOPROY%TYPE, 

    VIGENT IN PROYECTO.VIGENTE%TYPE) 

IS 

BEGIN 

                

 INSERT INTO PROYECTO (CodCIA,CodPyto,NombPyto,EmplJefeProy,CodCia1,CiaContrata,CodCC,CodCliente,FlgEmpConsorcio,CodSNIP, 

                       FecReg,CodFase,CodNivel,CodFuncion,CodSituacion,NumInfor,NumInforEntrg,EstPyto,FecEstado,ValRefer,CostoDirecto,CostoGGen,CostoFinan,ImpUtilidad, 

                       CostoTotSinIGV,ImpIGV,CostoTotal,CostoPenalid,CodDpto,CodProv,CodDist,FecViab,RutaDoc,AnnoIni,AnnoFin,CodObjC,LogoProy,TabEstado,CodEstado,Observac,Vigente) 

                       VALUES 

                       (COD_CIA,SEC_PROYECTO.NEXTVAL,NOMPY,JEFE,-999,CIACONT,-999,CODCLI,'-','-', 

                       FECRE,0,0,'-',0,0,0,ESTPYT,FECEST,VALREF,-999,-999,-999,-999, 

                       COSTOTOTSIN,IGV,COSTOT,-999,'-','-','-','01-01-2022','RUTA_DOC',ANNOIN,ANNOFI,0,LOGO,'-1','1',OBS,VIGENT); 

END; 
`,
      `
/*INSERTAR CLIENTE*/ 

create or replace PROCEDURE INSERTAR_CLIENTE( 

    CODCIA IN PERSONA.CODCIA%TYPE,  

    DESP IN PERSONA.DESPERSONA%TYPE, 

    DESCOR IN PERSONA.DESCORTA%TYPE, 

    DESCALT IN PERSONA.DESCALTERNA%TYPE, 

    DESCORALT IN PERSONA.DESCORTAALT%TYPE, 

    VIG IN PERSONA.VIGENTE%TYPE, 

    RUC IN CLIENTE.NRORUC%TYPE) 

IS 

BEGIN 

 INSERT INTO PERSONA VALUES(CODCIA,SEC_PERSONA.NEXTVAL,'2',DESP,DESCOR,DESCALT,DESCORALT,VIG); 

 INSERT INTO CLIENTE VALUES(CODCIA,SEC_PERSONA.CURRVAL,RUC,VIG); 

END; `,
      `
/*INSERTAR ELEMENTOS*/ 

 

create or replace PROCEDURE INSERTAR_ELEMENTOS( 

    CTAB IN ELEMENTOS.CODTAB%TYPE, 

    CELE IN ELEMENTOS.CODELEM%TYPE, 

    DEELE IN ELEMENTOS.DENELE%TYPE, 

    DECORTA IN ELEMENTOS.DENCORTA%TYPE, 

    VIG IN ELEMENTOS.VIGENTE%TYPE) 

IS 

BEGIN 

 INSERT INTO ELEMENTOS VALUES 

(CTAB,CELE,DEELE,DECORTA,VIG); 

END; 
`,

      `
/*INSERTAR TABS*/ 

 

create or replace PROCEDURE INSERTAR_TABS( 

    /*CTAB IN TABS.CODTAB%TYPE,*/ 

    DETAB IN TABS.DENTAB%TYPE, 

    DECOR IN TABS.DENCORTA%TYPE, 

    VIG IN TABS.VIGENTE%TYPE) 

IS 

BEGIN 

 INSERT INTO TABS VALUES(SEC_TABS.NEXTVAL,DETAB,DECOR,VIG); 

END; 
`,

      `
/*INSERTAR PARTIDA*/ 

create or replace NONEDITIONABLE PROCEDURE INSERTAR_PARTIDA( 

    CODCIA IN PARTIDA.CODCia%TYPE,  

    INGEGRE IN PARTIDA.IngEgr%TYPE, 

    DESPARTIDA IN PARTIDA.DESPARTIDA%TYPE, 

    tUniMed IN PARTIDA.TUNIMED%TYPE, 

    eUniMed IN PARTIDA.EUNIMED%TYPE, 

    VIG IN PARTIDA.VIGENTE%TYPE) 

IS 

BEGIN 

IF(INGEGRE = 'E') THEN 

 INSERT INTO PARTIDA VALUES(CODCIA,INGEGRE,SEC_PARTIDA_E.NEXTVAL, 

 TO_CHAR(SEC_CODPARTIDAS.NEXTVAL,'99,999,999'),DESPARTIDA,'1',1,tUniMed,eUniMed,1,VIG); 

END IF; 

IF(INGEGRE = 'I') THEN 

 INSERT INTO PARTIDA VALUES(CODCIA,INGEGRE,SEC_PARTIDA_I.NEXTVAL, 

 TO_CHAR(SEC_CODPARTIDAS.NEXTVAL,'99,999,999'),DESPARTIDA,'1',1,tUniMed,eUniMed,1,VIG); 

END IF; 

END; 
`,
      `
/*INSERTAR PARTIDA_MEZCLA*/ 

create or replace NONEDITIONABLE PROCEDURE INSERTAR_PARTIDA_MEZCLA( 

    CODCIA IN PARTIDA_MEZCLA.CODCIA%TYPE,  

    INGEGRE IN PARTIDA_MEZCLA.IngEgr%TYPE, 

    CODPAR IN PARTIDA_MEZCLA.CODPARTIDA%TYPE, 

    PADCOD IN PARTIDA_MEZCLA.PADCODPARTIDA%TYPE, 

    tUniMed IN PARTIDA_MEZCLA.TUNIMED%TYPE, 

    eUniMed IN PARTIDA_MEZCLA.EUNIMED%TYPE, 

    COSTO IN PARTIDA_MEZCLA.COSTOUNIT%TYPE, 

    NIVEL IN PARTIDA_MEZCLA.NIVEL%TYPE, 

    ORDEN IN PARTIDA_MEZCLA.ORDEN%TYPE, 

    VIG IN PARTIDA_MEZCLA.VIGENTE%TYPE) 

IS 

BEGIN 

IF(INGEGRE = 'E') THEN 

 INSERT INTO PARTIDA_MEZCLA VALUES(CODCIA,INGEGRE,CODPAR,SEC_PARTIDA_MEZCLA_E.NEXTVAL, 

 PADCOD,tUniMed,eUniMed,COSTO,NIVEL,ORDEN,VIG); 

END IF; 

IF(INGEGRE = 'I') THEN 

 INSERT INTO PARTIDA_MEZCLA VALUES(CODCIA,INGEGRE,CODPAR,SEC_PARTIDA_MEZCLA_I.NEXTVAL, 

 PADCOD,tUniMed,eUniMed,COSTO,NIVEL,ORDEN,VIG); 

END IF; 

END;`,
      `
/*INSERTAR PROY_PARTIDA*/ 

create or replace NONEDITIONABLE PROCEDURE INSERTAR_PROY_PARTIDA( 

    CODPYTO IN PROY_PARTIDA.CODPYTO%TYPE, 

    NROVERSION IN PROY_PARTIDA.NROVERSION%TYPE, 

    CODCIA IN PROY_PARTIDA.CODCIA%TYPE, 

    INGEGRE IN PROY_PARTIDA.IngEgr%TYPE, 

    CODP IN PROY_PARTIDA.CODPARTIDA%TYPE, 

    CODPAR IN PROY_PARTIDA.CODPARTIDAS%TYPE, 

    TABE IN PROY_PARTIDA.TABESTADO%TYPE, 

    CODE IN PROY_PARTIDA.CODESTADO%TYPE, 

    VIG IN PROY_PARTIDA.VIGENTE%TYPE) 

IS 

BEGIN 

INSERT INTO PROY_PARTIDA VALUES(CODCIA,CODPYTO,NROVERSION,INGEGRE,CODP,CODPAR,'1',1,'1',TABE,CODE,VIG); 

END; `,
      `
/*INSERTAR PROY_PARTIDA_MEZCLA*/ 

create or replace NONEDITIONABLE PROCEDURE INSERTAR_PROY_PARTIDA_MEZCLA( 

    CODC IN PROY_PARTIDA_MEZCLA.CODCIA%TYPE, 

    CODPYTO IN PROY_PARTIDA_MEZCLA.CODPYTO%TYPE, 

    NROVERSION IN PROY_PARTIDA_MEZCLA.NROVERSION%TYPE, 

    PADCOD IN PROY_PARTIDA_MEZCLA.PADCODPARTIDA%TYPE, 

    INEG IN PROY_PARTIDA_MEZCLA.IngEgr%TYPE, 

    CAN IN PROY_PARTIDA_MEZCLA.CANT%TYPE) 

AS 

CURSOR cpm IS 

SELECT CODPARTIDA,PADCODPARTIDA,TUNIMED,EUNIMED,COSTOUNIT,NIVEL,ORDEN  

FROM PARTIDA_MEZCLA WHERE CODCIA=CODC AND PADCODPARTIDA=PADCOD AND INGEGR=INEG; 

CURSOR cpm2 IS 

SELECT CODPARTIDA,PADCODPARTIDA,TUNIMED,EUNIMED,COSTOUNIT,NIVEL,ORDEN  

FROM PARTIDA_MEZCLA WHERE CODCIA=CODC AND CODPARTIDA=PADCOD AND PADCODPARTIDA=0 AND INGEGR=INEG; 

V_total PROY_PARTIDA_MEZCLA.COSTOTOT%TYPE; 

BEGIN 

IF(INEG = 'E') THEN 

 FOR R1 IN CPM2 LOOP 

 V_total := CAN*R1.COSTOUNIT; 

 INSERT INTO PROY_PARTIDA_MEZCLA VALUES(CODC,CODPYTO,INEG,NROVERSION,R1.CODPARTIDA, 

 SEC_PROY_PARTIDA_MEZCLA_E.nextval,R1.PADCODPARTIDA,R1.TUNIMED,R1.EUNIMED, 

 R1.NIVEL,R1.ORDEN,R1.COSTOUNIT,CAN,V_total); 

 END LOOP; 

 

 FOR R2 IN CPM LOOP 

 V_total := CAN*R2.COSTOUNIT; 

 INSERT INTO PROY_PARTIDA_MEZCLA VALUES(CODC,CODPYTO,INEG,NROVERSION,R2.CODPARTIDA, 

 SEC_PROY_PARTIDA_MEZCLA_E.nextval,R2.PADCODPARTIDA,R2.TUNIMED,R2.EUNIMED, 

 R2.NIVEL,R2.ORDEN,R2.COSTOUNIT,CAN,V_total); 

 END LOOP; 

END IF; 

IF(INEG = 'I') THEN 

 FOR R3 IN CPM2 LOOP 

 V_total := CAN*R3.COSTOUNIT; 

 INSERT INTO PROY_PARTIDA_MEZCLA VALUES(CODC,CODPYTO,INEG,NROVERSION,R3.CODPARTIDA, 

 SEC_PROY_PARTIDA_MEZCLA_I.nextval,R3.PADCODPARTIDA,R3.TUNIMED,R3.EUNIMED, 

 R3.NIVEL,R3.ORDEN,R3.COSTOUNIT,CAN,V_total); 

 END LOOP; 

 

 FOR R4 IN CPM LOOP 

 V_total := CAN*R4.COSTOUNIT; 

 INSERT INTO PROY_PARTIDA_MEZCLA VALUES(CODC,CODPYTO,INEG,NROVERSION,R4.CODPARTIDA, 

 SEC_PROY_PARTIDA_MEZCLA_I.nextval,R4.PADCODPARTIDA,R4.TUNIMED,R4.EUNIMED, 

 R4.NIVEL,R4.ORDEN,R4.COSTOUNIT,CAN,V_total); 

 END LOOP; 

END IF; 

END; `,
      `
/*INSERTAR DPROY_PARTIDA_MEZCLA*/ 

create or replace PROCEDURE INSERTAR_DPROY_PARTIDA_MEZCLA( 

    CODCIA IN DPROY_PARTIDA_MEZCLA.CODCIA%TYPE, 

    CODPYTO IN DPROY_PARTIDA_MEZCLA.CODPYTO%TYPE, 

    INGEGR IN DPROY_PARTIDA_MEZCLA.INGEGR%TYPE, 

    NROVERSION IN DPROY_PARTIDA_MEZCLA.NROVERSION%TYPE, 

    CODPART IN DPROY_PARTIDA_MEZCLA.CODPARTIDA%TYPE, 

    CORR IN DPROY_PARTIDA_MEZCLA.CORR%TYPE, 

    EDESEMB IN DPROY_PARTIDA_MEZCLA.EDESEMBOLSO%TYPE, 

    ECPAGO IN DPROY_PARTIDA_MEZCLA.ECOMPPAGO%TYPE, 

    FECDESEMB IN DPROY_PARTIDA_MEZCLA.FECDESEMBOLSO%TYPE, 

    IMPDESEMNETO IN DPROY_PARTIDA_MEZCLA.IMPDESEMBNETO%TYPE, 

    IMPDESEMIGV IN DPROY_PARTIDA_MEZCLA.IMPDESEMBIGV%TYPE, 

    IMPDESEMTOT IN DPROY_PARTIDA_MEZCLA.IMPDESEMBTOT%TYPE, 

    SEMI IN DPROY_PARTIDA_MEZCLA.SEMILLA%TYPE, 

    REPETICION IN DPROY_PARTIDA_MEZCLA.CODCIA%TYPE) 

IS 

BEGIN 

 

IF(INGEGR = 'E') THEN 

 IF(REPETICION = 0) THEN 

  IF(EDESEMB = 1) THEN 

  INSERT INTO DPROY_PARTIDA_MEZCLA VALUES 

  (CODCIA,CODPYTO,INGEGR,NROVERSION,CODPART,CORR,  

  SEC_DPROY_PARTIDA_MEZCLA_E.NEXTVAL,3,EDESEMB,SEC_DPROY_PARTIDA_MEZCLA_ADELANTO.NEXTVAL,4, 

  ECPAGO,FECDESEMB,IMPDESEMNETO,IMPDESEMIGV,IMPDESEMTOT,SEC_DPROY_PARTIDA_MEZCLA_SEMILLA_E.NEXTVAL); 

  ELSE  

  INSERT INTO DPROY_PARTIDA_MEZCLA VALUES 

  (CODCIA,CODPYTO,INGEGR,NROVERSION,CODPART,CORR,  

  SEC_DPROY_PARTIDA_MEZCLA_E.NEXTVAL,3,EDESEMB,SEC_DPROY_PARTIDA_MEZCLA_PAGO.NEXTVAL,4, 

  ECPAGO,FECDESEMB,IMPDESEMNETO,IMPDESEMIGV,IMPDESEMTOT,SEC_DPROY_PARTIDA_MEZCLA_SEMILLA_E.NEXTVAL); 

  END IF; 

   ELSE 

   IF(EDESEMB = 1) THEN 

   INSERT INTO DPROY_PARTIDA_MEZCLA VALUES 

   (CODCIA,CODPYTO,INGEGR,NROVERSION,CODPART,CORR,  

   SEC_DPROY_PARTIDA_MEZCLA_E.NEXTVAL,3,EDESEMB,SEC_DPROY_PARTIDA_MEZCLA_ADELANTO.NEXTVAL,4, 

   ECPAGO,FECDESEMB,IMPDESEMNETO,IMPDESEMIGV,IMPDESEMTOT,SEMI); 

   ELSE 

   INSERT INTO DPROY_PARTIDA_MEZCLA VALUES 

   (CODCIA,CODPYTO,INGEGR,NROVERSION,CODPART,CORR,  

   SEC_DPROY_PARTIDA_MEZCLA_E.NEXTVAL,3,EDESEMB,SEC_DPROY_PARTIDA_MEZCLA_PAGO.NEXTVAL,4, 

   ECPAGO,FECDESEMB,IMPDESEMNETO,IMPDESEMIGV,IMPDESEMTOT,SEMI); 

   END IF; 

 END IF; 

END IF; 

 

IF(INGEGR = 'I') THEN 

 IF(REPETICION = 0) THEN 

  IF(EDESEMB = 1) THEN 

  INSERT INTO DPROY_PARTIDA_MEZCLA VALUES 

  (CODCIA,CODPYTO,INGEGR,NROVERSION,CODPART,CORR,  

  SEC_DPROY_PARTIDA_MEZCLA_I.NEXTVAL,3,EDESEMB,SEC_DPROY_PARTIDA_MEZCLA_ADELANTO.NEXTVAL,4, 

  ECPAGO,FECDESEMB,IMPDESEMNETO,IMPDESEMIGV,IMPDESEMTOT,SEC_DPROY_PARTIDA_MEZCLA_SEMILLA_I.NEXTVAL); 

  ELSE  

  INSERT INTO DPROY_PARTIDA_MEZCLA VALUES 

  (CODCIA,CODPYTO,INGEGR,NROVERSION,CODPART,CORR,  

  SEC_DPROY_PARTIDA_MEZCLA_I.NEXTVAL,3,EDESEMB,SEC_DPROY_PARTIDA_MEZCLA_PAGO.NEXTVAL,4, 

  ECPAGO,FECDESEMB,IMPDESEMNETO,IMPDESEMIGV,IMPDESEMTOT,SEC_DPROY_PARTIDA_MEZCLA_SEMILLA_I.NEXTVAL); 

  END IF; 

   ELSE 

   IF(EDESEMB = 1) THEN 

   INSERT INTO DPROY_PARTIDA_MEZCLA VALUES 

   (CODCIA,CODPYTO,INGEGR,NROVERSION,CODPART,CORR,  

   SEC_DPROY_PARTIDA_MEZCLA_I.NEXTVAL,3,EDESEMB,SEC_DPROY_PARTIDA_MEZCLA_ADELANTO.NEXTVAL,4, 

   ECPAGO,FECDESEMB,IMPDESEMNETO,IMPDESEMIGV,IMPDESEMTOT,SEMI); 

   ELSE 

   INSERT INTO DPROY_PARTIDA_MEZCLA VALUES 

   (CODCIA,CODPYTO,INGEGR,NROVERSION,CODPART,CORR,  

   SEC_DPROY_PARTIDA_MEZCLA_I.NEXTVAL,3,EDESEMB,SEC_DPROY_PARTIDA_MEZCLA_PAGO.NEXTVAL,4, 

   ECPAGO,FECDESEMB,IMPDESEMNETO,IMPDESEMIGV,IMPDESEMTOT,SEMI); 

   END IF; 

 END IF; 

END IF; 

 

UPDATE_FLUJOCAJA_DET_UNALINEA_Y_GLOBAL(CODCIA,CODPYTO,INGEGR,CODPART,IMPDESEMTOT,FECDESEMB,'P'); 

 

END; `,
      `
/*INSERTAR COMP_PAGOCAB*/ 

create or replace NONEDITIONABLE PROCEDURE INSERTAR_COMP_PAGOCAB( 

    CODCIA IN comp_pagocab.codcia%TYPE, 

    CODPROVEEDOR IN comp_pagocab.codproveedor%TYPE, 

    NROCP IN comp_pagocab.nrocp%TYPE, 

    CODPYTO IN comp_pagocab.codpyto%TYPE, 

    NROPAGO IN comp_pagocab.nropago%TYPE, 

    TCOMPPAGO IN comp_pagocab.tcomppago%TYPE, 

    ECOMPPAGO IN comp_pagocab.ecomppago%TYPE, 

    FECCP IN comp_pagocab.feccp%TYPE, 

    TMONEDA IN comp_pagocab.tmoneda%TYPE, 

    EMONEDA IN comp_pagocab.emoneda%TYPE, 

    TIPCAMBIO IN comp_pagocab.tipcambio%TYPE, 

    IMPMO IN comp_pagocab.impmo%TYPE, 

    IMPNETOMN IN comp_pagocab.impnetomn%TYPE, 

    IMPIGVMN IN comp_pagocab.impigvmn%TYPE, 

    IMPTOTALMN IN comp_pagocab.imptotalmn%TYPE, 

    FOTOCP IN comp_pagocab.fotocp%TYPE, 

    FOTOABONO IN comp_pagocab.fotoabono%TYPE, 

    FECABONO IN comp_pagocab.fecabono%TYPE, 

    DESABONO IN comp_pagocab.desabono%TYPE, 

    SEMILLA IN comp_pagocab.semilla%TYPE, 

    TABESTADO IN comp_pagocab.tabestado%TYPE, 

    CODESTADO IN comp_pagocab.codestado%TYPE) 

IS 

BEGIN 

INSERT INTO COMP_PAGOCAB VALUES(CODCIA,CODPROVEEDOR,NROCP,CODPYTO,NROPAGO,TCOMPPAGO,ECOMPPAGO,FECCP,TMONEDA,EMONEDA,TIPCAMBIO,IMPMO,IMPNETOMN,IMPIGVMN,IMPTOTALMN,FOTOCP,FOTOABONO,FECABONO,DESABONO, 

                                SEMILLA,TABESTADO,CODESTADO); 

END; 
`,
      `
/*INSERTAR INSERTAR_COMP_PAGODET*/ 

create or replace NONEDITIONABLE PROCEDURE INSERTAR_COMP_PAGODET( 

    CODCIA IN comp_pagodet.codcia%TYPE, 

    CODPROVEEDOR IN comp_pagodet.codproveedor%TYPE, 

    NRO_CP IN comp_pagodet.nrocp%TYPE, 

    SEC IN comp_pagodet.sec%TYPE, 

    INGEGR IN comp_pagodet.ingegr%TYPE, 

    CODPARTIDA IN comp_pagodet.codpartida%TYPE, 

    IMPNETOMN IN comp_pagodet.impnetomn%TYPE, 

    IMPIGVMN IN comp_pagodet.impigvmn%TYPE, 

    IMPTOTALMN IN comp_pagodet.imptotalmn%TYPE, 

    SEMILL IN comp_pagocab.semilla%TYPE, 

    COD_PYTO_AUXILIAR IN PROYECTO.codpyto%type) 

IS 

FECHA_DE_CP DATE; 

BEGIN 

    INSERT INTO COMP_PAGODET VALUES(CODCIA,CODPROVEEDOR,NRO_CP,SEC,INGEGR,CODPARTIDA,IMPNETOMN,IMPIGVMN,IMPTOTALMN,SEMILL); 

    SELECT FECCP INTO FECHA_DE_CP FROM COMP_PAGOCAB WHERE NROCP=NRO_CP; 

    UPDATE_FLUJOCAJA_DET_UNALINEA_Y_GLOBAL(CODCIA,COD_PYTO_AUXILIAR,INGEGR,CODPARTIDA,IMPTOTALMN,FECHA_DE_CP,'R'); 

END; `,
      `
/*INSERTAR INSERTAR_VTACOMP_PAGOCAB*/ 

create or replace NONEDITIONABLE PROCEDURE INSERTAR_VTACOMP_PAGOCAB( 

    CODCIA IN VTACOMP_PAGOCAB.codcia%TYPE, 

    NROCP IN VTACOMP_PAGOCAB.nrocp%TYPE, 

    CODPYTO IN VTACOMP_PAGOCAB.codpyto%TYPE, 

    CODCLIENTE IN VTACOMP_PAGOCAB.codcliente%TYPE, 

    --NROPAGO IN VTACOMP_PAGOCAB.nropago%TYPE, 

    TCOMPPAGO IN VTACOMP_PAGOCAB.tcomppago%TYPE, 

    ECOMPPAGO IN VTACOMP_PAGOCAB.ecomppago%TYPE, 

    FECCP IN VTACOMP_PAGOCAB.feccp%TYPE, 

    TMONEDA IN VTACOMP_PAGOCAB.tmoneda%TYPE, 

    EMONEDA IN VTACOMP_PAGOCAB.emoneda%TYPE, 

    TIPCAMBIO IN VTACOMP_PAGOCAB.tipcambio%TYPE, 

    IMPMO IN VTACOMP_PAGOCAB.impmo%TYPE, 

    IMPNETOMN IN VTACOMP_PAGOCAB.impnetomn%TYPE, 

    IMPIGVMN IN VTACOMP_PAGOCAB.impigvmn%TYPE, 

    IMPTOTALMN IN VTACOMP_PAGOCAB.imptotalmn%TYPE, 

    FOTOCP IN VTACOMP_PAGOCAB.fotocp%TYPE, 

    FOTOABONO IN VTACOMP_PAGOCAB.fotoabono%TYPE, 

    FECABONO IN VTACOMP_PAGOCAB.fecabono%TYPE, 

    DESABONO IN VTACOMP_PAGOCAB.desabono%TYPE, 

    SEMILLA IN VTACOMP_PAGOCAB.semilla%TYPE, 

    TABESTADO IN VTACOMP_PAGOCAB.tabestado%TYPE, 

    CODESTADO IN VTACOMP_PAGOCAB.codestado%TYPE) 

IS 

BEGIN 

INSERT INTO VTACOMP_PAGOCAB VALUES(CODCIA,NROCP,CODPYTO,CODCLIENTE,SEC_NRO_PAGO_VTA.nextval,TCOMPPAGO,ECOMPPAGO,FECCP,TMONEDA,EMONEDA,TIPCAMBIO,IMPMO,IMPNETOMN,IMPIGVMN,IMPTOTALMN,FOTOCP,FOTOABONO,FECABONO,DESABONO,SEMILLA,TABESTADO,CODESTADO); 

END; `,
      `
/*INSERTAR INSERTAR_VTACOMP_PAGODET*/ 

create or replace NONEDITIONABLE PROCEDURE INSERTAR_VTACOMP_PAGODET( 

    CODCIA IN VTACOMP_PAGODET.codcia%TYPE, 

    NRO_CP IN VTACOMP_PAGODET.nrocp%TYPE, 

    SEC IN VTACOMP_PAGODET.sec%TYPE, 

    INGEGR IN VTACOMP_PAGODET.ingegr%TYPE, 

    CODPARTIDA IN VTACOMP_PAGODET.codpartida%TYPE, 

    IMPNETOMN IN VTACOMP_PAGODET.impnetomn%TYPE, 

    IMPIGVMN IN VTACOMP_PAGODET.impigvmn%TYPE, 

    IMPTOTALMN IN VTACOMP_PAGODET.imptotalmn%TYPE, 

    SEMILL IN VTACOMP_PAGODET.semilla%TYPE, 

    COD_PYTO_AUXILIAR IN PROYECTO.codpyto%type) 

IS 

FECHA_DE_CP DATE; 

BEGIN 

    INSERT INTO VTACOMP_PAGODET VALUES(CODCIA,NRO_CP,SEC,INGEGR,CODPARTIDA,IMPNETOMN,IMPIGVMN,IMPTOTALMN,SEMILL); 

    SELECT FECCP INTO FECHA_DE_CP FROM VTACOMP_PAGOCAB WHERE NROCP=NRO_CP; 

    UPDATE_FLUJOCAJA_DET_UNALINEA_Y_GLOBAL(CODCIA,COD_PYTO_AUXILIAR,INGEGR,CODPARTIDA,IMPTOTALMN,FECHA_DE_CP,'R'); 

END; `,
    ],
  };

  static seed = [
    "ALTER SESSION SET NLS_DATE_FORMAT = 'DD-MM-YY'",
    "INSERT INTO CIA VALUES(SEC_CIA.NEXTVAL,'Devenco','Dev','1') ",

    "INSERT INTO CIA VALUES(SEC_CIA.NEXTVAL,'Maverik','Mav','1') ",

    "INSERT INTO CIA VALUES(SEC_CIA.NEXTVAL,'Donatello Space','Don','1') ",

    "INSERT INTO PERSONA VALUES(1,SEC_PERSONA.NEXTVAL,1,'Devenco','Dev','DevSer','DevSer','1') ",

    "INSERT INTO CLIENTE VALUES (1,SEC_PERSONA.CURRVAL,'52185059242','1') ",

    "INSERT INTO PERSONA VALUES(2,SEC_PERSONA.NEXTVAL,0,'Jorge Vargas Mozz','Jvargas','Jvargas','Jvargas','1') ",

    "INSERT INTO CLIENTE VALUES (2,SEC_PERSONA.CURRVAL,'74928122807','1') ",

    "INSERT INTO PERSONA VALUES(3,SEC_PERSONA.NEXTVAL,1,'PVN','PVN','PVN','PVN','1') ",

    "INSERT INTO CLIENTE VALUES (3,SEC_PERSONA.CURRVAL,'31972155442','1') ",

    "INSERT INTO PERSONA VALUES(1,SEC_PERSONA.NEXTVAL,1,'JPVD','PVD','PVD','PVD','1') ",

    "INSERT INTO EMPLEADO VALUES (1, SEC_PERSONA.CURRVAL, '3003001 Daisy Dr', '976351455', 'Futbol', NULL, TO_DATE('03-08-1997', 'DD-MM-YYYY'), '74130919', '224096', TO_DATE('11-10-2010','DD-MM-YYYY'), '1' ,'1', 'Observacion 1', 1, 'lawrence.cruz@gmail.com','1') ",

    "INSERT INTO PERSONA VALUES(2,SEC_PERSONA.NEXTVAL,1,'Trafic Clay','Clay	','Clay','Clay','1')",

    "INSERT INTO EMPLEADO VALUES (2, SEC_PERSONA.CURRVAL, '595 Eason Rd', '907521493', 'Voley', NULL, TO_DATE('03-04-1998','DD-MM-YYYY'), '75500041', '224097', TO_DATE('22-10-1990','DD-MM-YYYY'), '1', '2' ,'Observacion 2', 2, 'micheal.brown@gmail.com','1') ",

    "INSERT INTO PERSONA VALUES(3,SEC_PERSONA.NEXTVAL,1,'Lab Pelaez','LabP','LabP','LabP','1')",

    "INSERT INTO EMPLEADO VALUES (3, SEC_PERSONA.CURRVAL, '8769 W Belt Line Rd', '905704997', 'Basquet', NULL, TO_DATE('02-04-1984','DD-MM-YYYY'), '78073872', '224098', TO_DATE('22-10-1998','DD-MM-YYYY') ,'0', '3', 'Observacion 3', 3, 'candice.berry@gmail.com','1') ",

    "INSERT INTO PERSONA VALUES(1,SEC_PERSONA.NEXTVAL,0,'Moncada','Mon','Mon','Mon','1')",

    "INSERT INTO PROVEEDOR VALUES (1, SEC_PERSONA.CURRVAL, '46380575736','1')",

    "INSERT INTO PERSONA VALUES(2,SEC_PERSONA.NEXTVAL,1,'Mun. Lima','ML','ML','ML','1')",

    "INSERT INTO PROVEEDOR VALUES (2, SEC_PERSONA.CURRVAL, '40767064641','1')",

    "INSERT INTO PERSONA VALUES(3,SEC_PERSONA.NEXTVAL,1,'Consorcio Sierra Sur','ConSS','ConSS','ConSS','1')",

    "INSERT INTO PROVEEDOR VALUES (3, SEC_PERSONA.CURRVAL, '11124638262','1')",

    "INSERT INTO PERSONA VALUES(1,SEC_PERSONA.NEXTVAL,1,'Consorcio Mar','ConD','Emape','Ema','1')",

    "INSERT INTO EMPRESA_VTA VALUES(1,SEC_PERSONA.CURRVAL,'46380575736','1','20-09-2018','20-05-2023',NULL,'Consorcio: Empresa cosapi 40%, empresa ing2 30%, Dev. 30%.','1') ",

    "INSERT INTO PERSONA VALUES(2,SEC_PERSONA.NEXTVAL,1,'Consorcio Sol','ConD','Emape','Ema','1') ",

    "INSERT INTO EMPRESA_VTA VALUES(2,SEC_PERSONA.CURRVAL,'40767064641','1','20-09-2020','20-05-2021',NULL,'Consorcio','1') ",

    "INSERT INTO PERSONA VALUES(3,SEC_PERSONA.NEXTVAL,1,'Mun. Pasco','ConD','Emape','Ema','1') ",

    "INSERT INTO EMPRESA_VTA VALUES(3,SEC_PERSONA.CURRVAL,'11124638262','0','20-09-2018','20-05-2023',NULL,'Empresa Devenco','1') ",

    "INSERT INTO PROYECTO VALUES(1,SEC_PROYECTO.NEXTVAL,'Consorcio Desarrollo',4,-999,10,-999,1,'-','-','20-09-2019',0,0,'-',0,0,0,1,'20-09-2020',9874.25,-999,-999,-999,-999,18604.12,17,19604.12,-999,'-','-','-','01-01-2021','RUTA_DOC',2019,2026,0,NULL,-1,1,'Observacion de precio alta.','1') ",

    "INSERT INTO PROYECTO VALUES(2,SEC_PROYECTO.NEXTVAL,'Consorcio Sierra Sur',5,-999,11,-999,2,'-','-','21-09-2017',0,0,'-',0,0,0,2,'21-09-2018',7874.22,-999,-999,-999,-999,19604.12,18,20604.12,-999,'-','-','-','01-01-2021','RUTA_DOC',2017,2024,0,NULL,-1,1,'Observacion de precio alta.','1') ",

    "INSERT INTO PROYECTO VALUES(3,SEC_PROYECTO.NEXTVAL,'Consorcio Lima',6,-999,12,-999,3,'-','-','17-02-2021',0,0,'-',0,0,0,3,'17-02-2022',17674.23,-999,-999,-999,-999,22604.12,19,23604.12,-999,'-','-','-','01-01-2021','RUTA_DOC',2021,2028,0,NULL,-1,1,'Observacion de precio alta.','0') ",

    "INSERT INTO TABS VALUES ('1','Unidad de medida','Umed','1') ",

    "INSERT INTO TABS VALUES ('2','Moneda','Mon','1') ",

    "INSERT INTO TABS VALUES ('3','Desembolso','Desem','1') ",

    "INSERT INTO TABS VALUES ('4','Comprobante de Pago','CompPago','1') ",

    "INSERT INTO ELEMENTOS VALUES ('1','1','UNI','UNI','1') ",

    "INSERT INTO ELEMENTOS VALUES ('1','2','Kilogramo','Kg','1') ",

    "INSERT INTO ELEMENTOS VALUES ('1','3','Metro','M','1') ",

    "INSERT INTO ELEMENTOS VALUES ('2','1','Soles','S/','1') ",

    "INSERT INTO ELEMENTOS VALUES ('2','2','Dólares','$','1') ",

    "INSERT INTO ELEMENTOS VALUES ('3','1','Adelanto','Adel','1') ",

    "INSERT INTO ELEMENTOS VALUES ('3','2','Pago','Pago','1') ",

    "INSERT INTO ELEMENTOS VALUES ('4','1','Factura','Fact','1') ",

    "INSERT INTO ELEMENTOS VALUES ('4','2','Recibo por Honorarios','RxH','1') ",

    "INSERT INTO ELEMENTOS VALUES ('4','3','Voucher','Vou','1') ",

    "INSERT INTO PARTIDA VALUES(1,'I',SEC_PARTIDA_I.NEXTVAL,TO_CHAR(SEC_CODPARTIDAS.NEXTVAL,'99,999,999'),'Ingreso','1',1,'2','2',0,'1') ",

    "INSERT INTO PARTIDA VALUES(1,'I',SEC_PARTIDA_I.NEXTVAL,TO_CHAR(SEC_CODPARTIDAS.NEXTVAL,'99,999,999'),'Venta','1',1,'2','2',0,'1') ",

    "INSERT INTO PARTIDA VALUES(1,'E',SEC_PARTIDA_E.NEXTVAL,TO_CHAR(SEC_CODPARTIDAS.NEXTVAL,'99,999,999'),'Trafico','1',1,'1','1',0,'1') ",

    "INSERT INTO PARTIDA VALUES(1,'E',SEC_PARTIDA_E.NEXTVAL,TO_CHAR(SEC_CODPARTIDAS.NEXTVAL,'99,999,999'),'Topografía','1',1,'1','1',0,'1') ",

    "INSERT INTO PARTIDA VALUES(1,'E',SEC_PARTIDA_E.NEXTVAL,TO_CHAR(SEC_CODPARTIDAS.NEXTVAL,'99,999,999'),'Hidrología','1',1,'1','1',0,'1') ",

    "INSERT INTO PARTIDA VALUES(1,'E',SEC_PARTIDA_E.NEXTVAL,TO_CHAR(SEC_CODPARTIDAS.NEXTVAL,'99,999,999'),'Suelos','1',1,'1','1',0,'1') ",

    "INSERT INTO PARTIDA VALUES(1,'E',SEC_PARTIDA_E.NEXTVAL,TO_CHAR(SEC_CODPARTIDAS.NEXTVAL,'99,999,999'),'Puentes','1',1,'1','1',0,'1') ",

    "INSERT INTO PARTIDA VALUES(1,'E',SEC_PARTIDA_E.NEXTVAL,TO_CHAR(SEC_CODPARTIDAS.NEXTVAL,'99,999,999'),'Estructura 01','1',1,'1','1',0,'1') ",

    "INSERT INTO PARTIDA VALUES(1,'E',SEC_PARTIDA_E.NEXTVAL,TO_CHAR(SEC_CODPARTIDAS.NEXTVAL,'99,999,999'),'Especialista en Suelos','1',1,'1','1',0,'1') ",

    "INSERT INTO PARTIDA VALUES(1,'E',SEC_PARTIDA_E.NEXTVAL,TO_CHAR(SEC_CODPARTIDAS.NEXTVAL,'99,999,999'),'Asistente en Suelos','1',1,'1','1',0,'1') ",

    "INSERT INTO PARTIDA VALUES(1,'E',SEC_PARTIDA_E.NEXTVAL,TO_CHAR(SEC_CODPARTIDAS.NEXTVAL,'99,999,999'),'Obrero','1',1,'1','1',0,'1') ",

    "INSERT INTO PARTIDA VALUES(1,'E',SEC_PARTIDA_E.NEXTVAL,TO_CHAR(SEC_CODPARTIDAS.NEXTVAL,'99,999,999'),'Laboratorio de Suelos','1',1,'1','1',0,'1') ",

    "INSERT INTO PARTIDA VALUES(1,'E',SEC_PARTIDA_E.NEXTVAL,TO_CHAR(SEC_CODPARTIDAS.NEXTVAL,'99,999,999'),'FWD','1',1,'1','1',0,'1') ",

    "INSERT INTO PARTIDA_MEZCLA VALUES(1,'I',1,SEC_PARTIDA_MEZCLA_I.NEXTVAL, 0,'2','2',1000000,1,1,'1')",

    "INSERT INTO PARTIDA_MEZCLA VALUES(1,'I',2,SEC_PARTIDA_MEZCLA_I.NEXTVAL, 1,'2','2',2000000,2,2,'1')",

    "INSERT INTO PARTIDA_MEZCLA VALUES(1,'E',6,SEC_PARTIDA_MEZCLA_E.NEXTVAL, 0,'1','1',1000,1,1,'1')",

    "INSERT INTO PARTIDA_MEZCLA VALUES(1,'E',1,SEC_PARTIDA_MEZCLA_E.NEXTVAL, 6,'1','1',2000,2,1,'1')",

    "INSERT INTO PARTIDA_MEZCLA VALUES(1,'E',2,SEC_PARTIDA_MEZCLA_E.NEXTVAL, 6,'1','1',3000,2,2,'1')",

    "INSERT INTO PARTIDA_MEZCLA VALUES(1,'E',3,SEC_PARTIDA_MEZCLA_E.NEXTVAL, 6,'1','1',4000,2,3,'1')",

    "INSERT INTO PARTIDA_MEZCLA VALUES(1,'E',4,SEC_PARTIDA_MEZCLA_E.NEXTVAL, 6,'1','1',5000,2,4,'1')",

    "INSERT INTO PARTIDA_MEZCLA VALUES(1,'E',5,SEC_PARTIDA_MEZCLA_E.NEXTVAL, 6,'1','1',6000,2,5,'1')",

    "INSERT INTO PARTIDA_MEZCLA VALUES(1,'E',7,SEC_PARTIDA_MEZCLA_E.NEXTVAL, 4,'1','1',7000,3,1,'1')",

    "INSERT INTO PARTIDA_MEZCLA VALUES(1,'E',8,SEC_PARTIDA_MEZCLA_E.NEXTVAL, 4,'1','1',8000,3,2,'1')",

    "INSERT INTO PARTIDA_MEZCLA VALUES(1,'E',9,SEC_PARTIDA_MEZCLA_E.NEXTVAL, 4,'1','1',9000,3,3,'1')",

    "INSERT INTO PARTIDA_MEZCLA VALUES(1,'E',10,SEC_PARTIDA_MEZCLA_E.NEXTVAL, 4,'1','1',10000,3,4,'1')",

    "INSERT INTO PROY_PARTIDA VALUES(1,1,1,'I',1, '10,000,00','1',1,'1','-1','1','1')",

    "INSERT INTO PROY_PARTIDA VALUES(1,1,1,'I',2, '10,000,01','1',1,'1','-1','1','1')",

    "INSERT INTO PROY_PARTIDA VALUES(1,1,1,'E',1, '10,000,02','1',1,'1','-1','1','1')",

    "INSERT INTO PROY_PARTIDA VALUES(1,1,1,'E',2, '10,000,03','1',1,'1','-1','1','1')",

    "INSERT INTO PROY_PARTIDA VALUES(1,1,1,'E',3, '10,000,04','1',1,'1','-1','1','1')",

    "INSERT INTO PROY_PARTIDA VALUES(1,1,1,'E',4, '10,000,05','1',1,'1','-1','1','1')",

    "INSERT INTO PROY_PARTIDA VALUES(1,1,1,'E',5, '10,000,06','1',1,'1','-1','1','1')",

    "INSERT INTO PROY_PARTIDA VALUES(1,1,1,'E',6, '10,000,07','1',1,'1','-1','1','1')",

    "INSERT INTO PROY_PARTIDA VALUES(1,1,1,'E',7, '10,000,08','1',1,'1','-1','1','1')",

    "INSERT INTO PROY_PARTIDA VALUES(1,1,1,'E',8, '10,000,09','1',1,'1','-1','1','1')",

    "INSERT INTO PROY_PARTIDA VALUES(1,1,1,'E',9, '10,000,10','1',1,'1','-1','1','1')",

    "INSERT INTO PROY_PARTIDA VALUES(1,1,1,'E',10, '10,000,11','1',1,'1','-1','1','1')",

    "INSERT INTO PROY_PARTIDA_MEZCLA VALUES(1,1,'I',1,1, SEC_PROY_PARTIDA_MEZCLA_I.nextval,0,'2','2',1,1,1000000,1,1000000)",

    "INSERT INTO PROY_PARTIDA_MEZCLA VALUES(1,1,'I',1,2, SEC_PROY_PARTIDA_MEZCLA_I.nextval,1,'2','2',2,1,2000000,1,2000000)",

    "INSERT INTO PROY_PARTIDA_MEZCLA VALUES(1,1,'E',1,6, SEC_PROY_PARTIDA_MEZCLA_E.nextval,0,'1','1',1,1,1000,1,1000)",

    "INSERT INTO PROY_PARTIDA_MEZCLA VALUES(1,1,'E',1,1, SEC_PROY_PARTIDA_MEZCLA_E.nextval,6,'1','1',2,1,2000,1,2000)",

    "INSERT INTO PROY_PARTIDA_MEZCLA VALUES(1,1,'E',1,2, SEC_PROY_PARTIDA_MEZCLA_E.nextval,6,'1','1',2,2,3000,1,3000)",

    "INSERT INTO PROY_PARTIDA_MEZCLA VALUES(1,1,'E',1,3, SEC_PROY_PARTIDA_MEZCLA_E.nextval,6,'1','1',2,3,4000,1,4000)",

    "INSERT INTO PROY_PARTIDA_MEZCLA VALUES(1,1,'E',1,4, SEC_PROY_PARTIDA_MEZCLA_E.nextval,6,'1','1',2,4,5000,1,5000)",

    "INSERT INTO PROY_PARTIDA_MEZCLA VALUES(1,1,'E',1,5, SEC_PROY_PARTIDA_MEZCLA_E.nextval,6,'1','1',2,5,6000,1,6000)",

    "INSERT INTO PROY_PARTIDA_MEZCLA VALUES(1,1,'E',1,7, SEC_PROY_PARTIDA_MEZCLA_E.nextval,4,'1','1',3,1,7000,1,7000)",

    "INSERT INTO PROY_PARTIDA_MEZCLA VALUES(1,1,'E',1,8, SEC_PROY_PARTIDA_MEZCLA_E.nextval,4,'1','1',3,2,8000,1,8000)",

    "INSERT INTO PROY_PARTIDA_MEZCLA VALUES(1,1,'E',1,9, SEC_PROY_PARTIDA_MEZCLA_E.nextval,4,'1','1',3,3,9000,1,9000)",

    "INSERT INTO PROY_PARTIDA_MEZCLA VALUES(1,1,'E',1,10, SEC_PROY_PARTIDA_MEZCLA_E.nextval,4,'1','1',3,4,10000,1,10000)",
  ];
}

export default Statements;
